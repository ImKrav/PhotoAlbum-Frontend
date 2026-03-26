export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <header className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Photo Album MiniApp
          </h1>
          <p className="text-sm text-zinc-600 sm:text-base">
            Lista de albumes y galeria de imagenes consumidas desde API.
          </p>
        </header>

        <section className="mb-6 rounded-lg border border-zinc-200 bg-white p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Estado de datos
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-md bg-amber-100 px-2 py-1 text-sm text-amber-800">
              Loading: pendiente
            </span>
            <span className="rounded-md bg-emerald-100 px-2 py-1 text-sm text-emerald-800">
              Data: pendiente
            </span>
            <span className="rounded-md bg-rose-100 px-2 py-1 text-sm text-rose-800">
              Error: sin error
            </span>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-lg border border-zinc-200 bg-white p-4">
            <h2 className="text-lg font-semibold">Albumes</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Aqui se mostrara la lista de albumes obtenidos desde el endpoint.
            </p>

            <div className="mt-4 space-y-3">
              <article className="rounded-md border border-zinc-200 p-3">
                <h3 className="text-sm font-medium">Album #1</h3>
                <p className="mt-1 text-sm text-zinc-600">Titulo del album...</p>
              </article>
              <article className="rounded-md border border-zinc-200 p-3">
                <h3 className="text-sm font-medium">Album #2</h3>
                <p className="mt-1 text-sm text-zinc-600">Titulo del album...</p>
              </article>
              <article className="rounded-md border border-zinc-200 p-3">
                <h3 className="text-sm font-medium">Album #3</h3>
                <p className="mt-1 text-sm text-zinc-600">Titulo del album...</p>
              </article>
            </div>
          </aside>

          <section className="rounded-lg border border-zinc-200 bg-white p-4">
            <h2 className="text-lg font-semibold">Galeria</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Al seleccionar un album, aqui apareceran sus imagenes.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-md border border-dashed border-zinc-300 bg-zinc-50"
                />
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
