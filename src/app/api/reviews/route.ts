import { NextResponse } from 'next/server';
import { getReviewsByProduct, createReview, getAllReviews } from '@/lib/admin/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (productId) {
    const reviews = await getReviewsByProduct(productId);
    return NextResponse.json(reviews);
  }

  const reviews = await getAllReviews();
  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  const body = await request.json();
  const review = await createReview(body);
  return NextResponse.json(review, { status: 201 });
}
