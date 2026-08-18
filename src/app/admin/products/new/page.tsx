import { Metadata } from 'next';
import ProductForm from '../ProductForm';

export const metadata: Metadata = {
  title: 'Add Product — Vault TCG Admin',
};

export default function NewProductPage() {
  return <ProductForm mode="create" />;
}
