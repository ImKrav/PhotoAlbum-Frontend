import Link from "next/link";

type HeaderProps = {
  title: string;
  subtitle?: string;
};

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-zinc-600 sm:text-base">{subtitle}</p>}
        </div>

        <nav className="flex gap-2 text-sm">
          <Link
            href="/"
            className="rounded-md border border-zinc-300 px-3 py-1.5 text-zinc-700 transition-colors hover:bg-zinc-100"
          >
            Inicio
          </Link>
          <Link
            href="/gallery"
            className="rounded-md border border-zinc-300 px-3 py-1.5 text-zinc-700 transition-colors hover:bg-zinc-100"
          >
            Gallery
          </Link>
        </nav>
      </div>
    </header>
  );
}
