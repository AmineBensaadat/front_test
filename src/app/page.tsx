import https from 'node:https';

async function getProducts() {
  return new Promise((resolve, reject) => {
    const req = https.get(
      'https://shop.lmarka.com/api/products',
      { rejectUnauthorized: false },
      (res) => {
        let body = '';

        res.on('data', (chunk) => {
          body += chunk;
        });

        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(body));
            } catch (error) {
              reject(new Error('Invalid JSON returned by products API'));
            }
          } else {
            reject(new Error(`Products API returned ${res.statusCode}`));
          }
        });
      }
    );

    req.on('error', reject);
  });
}

export default async function Home() {
  let products: unknown[] = [];
  let error: string | null = null;

  try {
    const data = await getProducts();
    const payload = data as { data?: unknown[]; products?: unknown[] };
    products = Array.isArray(data) ? (data as unknown[]) : (payload.products ?? payload.data ?? []);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error';
  }

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

        {error ? (
          <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">{error}</div>
        ) : products.length === 0 ? (
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            No products found.
          </div>
        ) : (
          <div id="products" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product: any, index: number) => (
              <article
                key={product?.id ?? index}
                className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h2 className="text-lg font-semibold">{product?.name ?? 'Unnamed product'}</h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {product?.description ?? 'No description available.'}
                </p>
                {product?.price != null && (
                  <p className="mt-4 font-medium">Price: {product.price}</p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
