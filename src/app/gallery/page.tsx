"use client";

import { useEffect, useState } from "react";
import { Footer, Header } from "@/components";
import { fetchAlbums, fetchPhotosByAlbum, type Album, type Photo } from "@/lib/api";

export default function GalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photosLoading, setPhotosLoading] = useState(false);
  const [photosError, setPhotosError] = useState<string | null>(null);

  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);

  useEffect(() => {
    fetchAlbums()
      .then(setAlbums)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectAlbum = (album: Album) => {
    setSelectedAlbum(album);
    setPhotosLoading(true);
    setPhotosError(null);

    fetchPhotosByAlbum(album.id)
      .then(setPhotos)
      .catch((err) => setPhotosError(err.message))
      .finally(() => setPhotosLoading(false));
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <Header
        title="Photo Album MiniApp"
        subtitle="Lista de álbumes y galería de imágenes consumidas desde API."
      />

      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <section className="mb-6 rounded-lg border border-zinc-200 bg-white p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Estado de datos
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <span
              className={`rounded-md px-2 py-1 text-sm ${
                loading ? "bg-amber-100 text-amber-800" : "bg-zinc-100 text-zinc-500"
              }`}
            >
              Loading: {String(loading)}
            </span>
            <span
              className={`rounded-md px-2 py-1 text-sm ${
                albums.length > 0 ? "bg-emerald-100 text-emerald-800" : "bg-zinc-100 text-zinc-500"
              }`}
            >
              Data: {albums.length} álbumes
            </span>
            <span
              className={`rounded-md px-2 py-1 text-sm ${
                error ? "bg-rose-100 text-rose-800" : "bg-zinc-100 text-zinc-500"
              }`}
            >
              Error: {error ?? "ninguno"}
            </span>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-lg border border-zinc-200 bg-white p-4">
            <h2 className="text-lg font-semibold">Álbumes</h2>
            <p className="mt-1 text-sm text-zinc-600">
              {loading ? "Cargando álbumes..." : `${albums.length} álbumes disponibles`}
            </p>
            <div className="mt-4 max-h-[60vh] space-y-2 overflow-y-auto pr-1">
              {loading && <p className="text-sm italic text-zinc-400">Cargando...</p>}
              {error && <p className="text-sm text-rose-600">{error}</p>}
              {albums.map((album) => (
                <button
                  key={album.id}
                  onClick={() => handleSelectAlbum(album)}
                  className={`w-full rounded-md border p-3 text-left transition-colors ${
                    selectedAlbum?.id === album.id
                      ? "border-zinc-800 bg-zinc-800 text-white"
                      : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
                  }`}
                >
                  <span className="mb-0.5 block text-xs text-zinc-400">#{album.id}</span>
                  <span className="block text-sm font-medium leading-snug">{album.title}</span>
                </button>
              ))}
            </div>
          </aside>

          <section className="rounded-lg border border-zinc-200 bg-white p-4">
            <h2 className="text-lg font-semibold">Galería</h2>
            <p className="mt-1 text-sm text-zinc-600">
              {!selectedAlbum
                ? "Selecciona un álbum para ver sus imágenes."
                : photosLoading
                  ? "Cargando fotos..."
                  : `${photos.length} fotos - ${selectedAlbum.title}`}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {!selectedAlbum &&
                Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-md border border-dashed border-zinc-300 bg-zinc-50"
                  />
                ))}

              {photosLoading &&
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-square animate-pulse rounded-md bg-zinc-200" />
                ))}

              {photosError && <p className="col-span-full text-sm text-rose-600">{photosError}</p>}

              {!photosLoading &&
                photos.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => setActivePhoto(photo)}
                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-md border border-zinc-200 bg-zinc-50"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.thumbnailUrl} alt={photo.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 flex flex-col justify-end bg-black/60 p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <span className="text-xs font-semibold text-white/70">#{photo.id}</span>
                      <span className="line-clamp-2 text-xs leading-snug text-white">{photo.title}</span>
                    </div>
                  </button>
                ))}
            </div>
          </section>
        </section>
      </main>

      <Footer />

      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-lg bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activePhoto.url} alt={activePhoto.title} className="w-full object-contain" />
            <div className="p-4">
              <span className="text-xs font-semibold text-zinc-400">#{activePhoto.id}</span>
              <p className="mt-1 text-sm text-zinc-800">{activePhoto.title}</p>
            </div>
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white hover:bg-black/70"
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
