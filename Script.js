async function download() {
  const url = document.getElementById("url").value.trim();
  const result = document.getElementById("result");

  if (!url) {
    alert("Enter a TikTok URL");
    return;
  }

  result.textContent = "Processing...";

  try {
    const res = await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    if (!res.ok || !data.downloadUrl) {
      result.textContent = "Error: Unable to get download link.";
      return;
    }

    result.innerHTML = `<a href="${data.downloadUrl}" target="_blank" class="text-blue-600 hover:underline">Download Video</a>`;
  } catch (err) {
    result.textContent = "Server error, try again later.";
    console.error(err);
  }
}