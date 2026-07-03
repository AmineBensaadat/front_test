'use client';

import React, { useEffect, useState } from 'react';

type Product = {
  id?: number;
  name?: string;
  description?: string | null;
  price?: string | number | null;
};

export default function ProductsClient() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    fetch('https://shop.lmarka.com/api/products')
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const list = Array.isArray(json) ? json : (json.data ?? json.products ?? []);
        if (mounted) setProducts(list as Product[]);
      })
      .catch((err) => {
        if (mounted) setError(err?.message ?? String(err));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="p-6">Loading products…</div>;
  if (error)
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">{error}</div>
    );
  if (!products || products.length === 0)
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        No products found.
      </div>
    );

  return (
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
          {product?.price != null && <p className="mt-4 font-medium">Price: {product.price}</p>}
        </article>
      ))}
    </div>
  );
}
