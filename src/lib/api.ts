import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Album {
  id: number;
  title: string;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export async function fetchAlbums(): Promise<Album[]> {
  const { data } = await apiClient.get<
    { userId: number; id: number; title: string }[]
  >("/albums");

  return data.map(({ id, title }) => ({ id, title }));
}

export async function fetchPhotosByAlbum(albumId: number): Promise<Photo[]> {
  const { data } = await apiClient.get<Photo[]>("/photos", {
    params: { albumId },
  });

  return data.map((photo) => ({
    ...photo,
    thumbnailUrl: `https://picsum.photos/seed/${photo.id}/150/150`,
    url: `https://picsum.photos/seed/${photo.id}/600/600`,
  }));
}

export async function fetchAllPhotos(): Promise<Photo[]> {
  const { data } = await apiClient.get<Photo[]>("/photos");
  return data;
}
