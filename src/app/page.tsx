import { Footer, Header } from "@/components";

const integrantes = ["Alejandro Bermúdez Bedoya", "Juan Diego Gómez Guzmán"];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <Header
        title="Photo Album MiniApp"
        subtitle="Aplicación web en React/Next para explorar álbumes y visualizar fotos por colección."
      />

      <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10 sm:px-6">
        <section className="rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Descripción de la aplicación</h2>
          <p className="mt-2 text-sm text-zinc-700 sm:text-base">
            Esta miniapp consume datos de una API pública para mostrar una lista de álbumes y su
            galería de fotos. Permite navegar por álbumes y visualizar las imágenes de forma clara
            e interactiva.
          </p>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-semibold">¿Qué problema resuelve?</h2>
          <p className="mt-2 text-sm text-zinc-700 sm:text-base">
            Centraliza la visualización de álbumes e imágenes en una sola interfaz, evitando
            consultas manuales a la API y facilitando la exploración de contenido por colección.
          </p>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Integrantes del grupo</h2>
          <ul className="mt-3 grid gap-2 text-sm text-zinc-700 sm:text-base">
            {integrantes.map((integrante) => (
              <li key={integrante} className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2">
                {integrante}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
