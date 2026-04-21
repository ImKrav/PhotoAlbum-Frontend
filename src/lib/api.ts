export type Album = {
  id: number;
  title: string;
};

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const API_BASE_URL = "/api";

export async function fetchAlbums(): Promise<Album[]> {
  const response = await fetch(`${API_BASE_URL}/albums`);
  if (!response.ok) {
    throw new Error("No se pudieron cargar los albumes");
  }

  return response.json();
}

export async function fetchPhotosByAlbum(albumId: number): Promise<Photo[]> {
  const response = await fetch(`${API_BASE_URL}/photos?albumId=${albumId}`);
  if (!response.ok) {
    throw new Error("No se pudieron cargar las fotos");
  }

  return response.json();
}
