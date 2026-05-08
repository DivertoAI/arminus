import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.QA_BASE_URL || "http://localhost:3001";
const outputDir = path.resolve("qa-artifacts");

async function main() {
  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1728, height: 1117 } });

  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, 0));

  await page.screenshot({ path: path.join(outputDir, "home-top.png"), fullPage: false });

  const topState = await page.evaluate(() => ({
    title: document.title,
    scrollY: window.scrollY,
    heroTop: document.querySelector(".hero-slab")?.getBoundingClientRect().top ?? null
  }));

  const midY = await page.evaluate(() => {
    const section = document.querySelector(".section-soft");
    if (!section) return 0;
    const top = section.getBoundingClientRect().top + window.scrollY - 40;
    return Math.max(0, Math.round(top));
  });

  await page.evaluate((y) => window.scrollTo(0, y), midY);
  await page.waitForTimeout(120);

  await page.screenshot({ path: path.join(outputDir, "home-mid.png"), fullPage: false });

  const midState = await page.evaluate(() => ({
    scrollY: window.scrollY,
    sectionSoftTop: document.querySelector(".section-soft")?.getBoundingClientRect().top ?? null
  }));

  await browser.close();

  console.log(
    JSON.stringify(
      {
        baseUrl,
        topState,
        midState,
        screenshots: {
          top: path.join(outputDir, "home-top.png"),
          mid: path.join(outputDir, "home-mid.png")
        }
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
