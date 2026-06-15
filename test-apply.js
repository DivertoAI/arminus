const fs = require("fs");

async function run() {
  // dot env removed
  const token = process.env.NEXT_PUBLIC_CEIPAL_TOKEN;

  const formData = new FormData();
  formData.append("job_id", "z5G7h3l6a1kMvyS65NP3c-slUSxkH60BGIJ2Um99lcQ=");
  formData.append("standard_fields.email", "john.tester@gmail.com");
  formData.append("standard_fields.firstname", "John");
  formData.append("standard_fields.lastname", "Tester");
  formData.append("standard_fields.mobile_number", "9999999999");
  formData.append("standard_fields.country", "840");
  formData.append("standard_fields.state", "26");
  formData.append("standard_fields.city", "hyd");
  formData.append("standard_fields.address", "Test Address 123");
  
  // Create a blob from the file to send natively
  const fileBuffer = fs.readFileSync("resume.pdf");
  const fileBlob = new Blob([fileBuffer], { type: "text/plain" });
  formData.append("document_fields.1", fileBlob, "resume.pdf");

  try {
    const res = await fetch("https://api.ceipal.com/v1/applyJobWithOutRegistration", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    });
    
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response Body:", text);
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
