"use client";

import { useEffect, useState } from "react";
import { fetchAlbums, fetchPhotosByAlbum, type Album, type Photo } from "@/lib/api";

export default function Home() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photosLoading, setPhotosLoading] = useState(false);
  const [photosError, setPhotosError] = useState<string | null>(null);

  useEffect(() => {
    fetchAlbums()
      .then(setAlbums)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedAlbum) return;

    setPhotosLoading(true);
    setPhotosError(null);

    fetchPhotosByAlbum(selectedAlbum.id)
      .then(setPhotos)
      .catch((err) => setPhotosError(err.message))
      .finally(() => setPhotosLoading(false));
  }, [selectedAlbum]);

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">

        {/* Encabezado */}
        <header className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Photo Album MiniApp
          </h1>
          <p className="text-sm text-zinc-600 sm:text-base">
            Lista de albumes y galeria de imagenes consumidas desde API.
          </p>
        </header>

        {/* Estado de datos */}
        <section className="mb-6 rounded-lg border border-zinc-200 bg-white p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Estado de datos
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className={`rounded-md px-2 py-1 text-sm ${loading ? "bg-amber-100 text-amber-800" : "bg-zinc-100 text-zinc-500"}`}>
              Loading: {String(loading)}
            </span>
            <span className={`rounded-md px-2 py-1 text-sm ${albums.length > 0 ? "bg-emerald-100 text-emerald-800" : "bg-zinc-100 text-zinc-500"}`}>
              Data: {albums.length} álbumes
            </span>
            <span className={`rounded-md px-2 py-1 text-sm ${error ? "bg-rose-100 text-rose-800" : "bg-zinc-100 text-zinc-500"}`}>
              Error: {error ?? "ninguno"}
            </span>
          </div>
        </section>

        {/* Grid principal */}
        <section className="grid gap-6 lg:grid-cols-[320px_1fr]">

          {/* Lista de álbumes */}
          <aside className="rounded-lg border border-zinc-200 bg-white p-4">
            <h2 className="text-lg font-semibold">Álbumes</h2>
            <p className="mt-1 text-sm text-zinc-600">
              {loading ? "Cargando álbumes..." : `${albums.length} álbumes disponibles`}
            </p>
            <div className="mt-4 space-y-2 max-h-[60vh] overflow-y-auto pr-1">
              {loading && <p className="text-sm text-zinc-400 italic">Cargando...</p>}
              {error && <p className="text-sm text-rose-600">{error}</p>}
              {albums.map((album) => (
                <button
                  key={album.id}
                  onClick={() => setSelectedAlbum(album)}
                  className={`w-full rounded-md border p-3 text-left transition-colors ${
                    selectedAlbum?.id === album.id
                      ? "border-zinc-800 bg-zinc-800 text-white"
                      : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
                  }`}
                >
                  <span className="block text-xs text-zinc-400 mb-0.5">#{album.id}</span>
                  <span className="block text-sm font-medium leading-snug">{album.title}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Galería de fotos */}
          <section className="rounded-lg border border-zinc-200 bg-white p-4">
            <h2 className="text-lg font-semibold">Galería</h2>
            <p className="mt-1 text-sm text-zinc-600">
              {!selectedAlbum
                ? "Selecciona un álbum para ver sus imágenes."
                : photosLoading
                ? "Cargando fotos..."
                : `${photos.length} fotos — ${selectedAlbum.title}`}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {/* Placeholders vacíos */}
              {!selectedAlbum && Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-md border border-dashed border-zinc-300 bg-zinc-50" />
              ))}

              {/* Skeleton de carga */}
              {photosLoading && Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-md bg-zinc-200" />
              ))}

              {photosError && <p className="col-span-full text-sm text-rose-600">{photosError}</p>}

              {/* Fotos reales */}
              {!photosLoading && photos.map((photo) => (
                <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-md border border-zinc-200 bg-zinc-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-black/60 p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="text-xs font-semibold text-white/70">#{photo.id}</span>
                    <span className="text-xs text-white leading-snug line-clamp-2">{photo.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
