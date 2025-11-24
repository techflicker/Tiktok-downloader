import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "YOUR_RAPIDAPI_KEY";
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || "YOUR_RAPIDAPI_HOST";

app.post("/api/download", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "TikTok URL is required" });

  try {
    const apiUrl = `https://${RAPIDAPI_HOST}/download?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl, {
      headers: {
        "x-rapidapi-host": RAPIDAPI_HOST,
        "x-rapidapi-key": RAPIDAPI_KEY,
      },
    });

    if (!response.ok) return res.status(500).json({ error: "API fetch failed" });
    const data = await response.json();
    const downloadUrl = data.nowm || data.awm || data.video || data.download_url || null;
    if (!downloadUrl) return res.status(500).json({ error: "Download URL missing", raw: data });

    res.json({ downloadUrl });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

app.listen(PORT, () => console.log("Server running on port", PORT));