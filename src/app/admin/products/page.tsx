import { Metadata } from 'next';
import ProductsContent from './ProductsContent';

export const metadata: Metadata = {
  title: 'Products — Vault TCG Admin',
};

export default function ProductsPage() {
  return <ProductsContent />;
}
