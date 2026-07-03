import ProductsClient from '../components/ProductsClient';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/70">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Shop Demo
            </p>
            <h1 className="text-xl font-semibold">Products</h1>
          </div>
          <nav className="flex gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <a href="#products" className="hover:text-zinc-900 dark:hover:text-white">
              Browse
            </a>
            <a href="#about" className="hover:text-zinc-900 dark:hover:text-white">
              About
            </a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <p className="mb-8 text-zinc-600 dark:text-zinc-400">
          Fetched from the API endpoint you provided.
        </p>

        <ProductsClient />
      </div>
    </main>
  );
}
