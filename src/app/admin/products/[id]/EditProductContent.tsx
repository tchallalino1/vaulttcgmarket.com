'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import ProductForm from '../ProductForm';

interface EditProductContentProps {
  productId: string;
}

export default function EditProductContent({ productId }: EditProductContentProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [productId]);

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;
    setDeleting(true);
    try {
      await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      router.push('/admin/products');
      router.refresh();
    } catch {
      alert('Failed to delete product.');
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="text-center py-20">
        <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <p className="text-gray-500 font-medium">Product not found</p>
        <button onClick={() => router.push('/admin/products')} className="mt-3 text-sm text-purple-600 hover:text-purple-700">
          Back to products
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
          <p className="text-sm text-gray-500 mt-1">{product.name}</p>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          {deleting ? 'Deleting...' : 'Delete Product'}
        </button>
      </div>
      <ProductForm initialData={product} mode="edit" />
    </div>
  );
}
