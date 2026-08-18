import { Metadata } from 'next';
import EditProductContent from './EditProductContent';

export const metadata: Metadata = {
  title: 'Edit Product — Vault TCG Admin',
};

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditProductContent productId={id} />;
}
