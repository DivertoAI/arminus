

async function test() {
  const formData = new FormData();
  formData.append("access_key", "7ddc42b9-3825-4b29-9b4a-748dbfa82ba4");
  formData.append("First Name", "Test");
  formData.append("Email", "test@example.com");

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Accept": "application/json"
      },
      body: formData
    });
    
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response text:", text);
  } catch (e) {
    console.error("Error:", e);
  }
}

test();
