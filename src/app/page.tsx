async function getProducts() {
  const res = await fetch('https://shop.lmarka.com/api/products', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export default async function Home() {
  let products = [];
  let error: string | null = null;

  try {
    const data = await getProducts();
    products = Array.isArray(data) ? data : (data?.products ?? []);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error';
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-semibold">Products</h1>
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
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
