/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");

const app = express();
const PORT = 4000;
const ALBUMS_URL = "https://jsonplaceholder.typicode.com/albums";
const PHOTOS_URL = "https://jsonplaceholder.typicode.com/photos";

app.use(express.json());

app.get("/albums", async (_req, res) => {
  try {
    const response = await fetch(ALBUMS_URL);

    if (!response.ok) {
      return res.status(response.status).json({ error: "No se pudieron obtener albums" });
    }

    const albums = await response.json();
    const sanitizedAlbums = albums.map((album) => ({
      id: album.id,
      title: album.title,
    }));

    return res.json(sanitizedAlbums);
  } catch {
    return res.status(500).json({ error: "Error obteniendo albums" });
  }
});

app.get("/photos", async (req, res) => {
  const { albumId } = req.query;

  try {
    const targetUrl = albumId ? `${PHOTOS_URL}?albumId=${albumId}` : PHOTOS_URL;
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: "No se pudieron obtener photos" });
    }

    const photos = await response.json();
    const photosWithPicsum = photos.map((photo) => ({
      ...photo,
      url: `https://picsum.photos/seed/photo-${photo.id}/600/600`,
      thumbnailUrl: `https://picsum.photos/seed/photo-${photo.id}/200/200`,
    }));

    return res.json(photosWithPicsum);
  } catch {
    return res.status(500).json({ error: "Error obteniendo photos" });
  }
});

app.listen(PORT, () => {
  console.log(`API lista en http://localhost:${PORT}`);
});
