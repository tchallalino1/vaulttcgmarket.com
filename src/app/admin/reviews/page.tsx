'use client';
import { useState, useEffect } from 'react';
import { Review } from '@/types';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reviews').then(r => r.json()).then(data => { setReviews(data); setLoading(false); });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this review?')) return;
    await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} className={`w-4 h-4 ${s <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
      ))}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
        <span className="text-sm text-gray-500">{reviews.length} reviews</span>
      </div>
      {loading ? <p className="text-gray-500">Loading...</p> : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Product</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Customer</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Rating</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Review</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Date</th>
                  <th className="text-right px-6 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reviews.map(review => (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium max-w-[200px] truncate">{review.productName}</td>
                    <td className="px-6 py-4">
                      <div>{review.customerName}</div>
                      <div className="text-xs text-gray-400">{review.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4"><StarRating rating={review.rating} /></td>
                    <td className="px-6 py-4 max-w-[300px]">
                      {review.title && <div className="font-medium text-xs">{review.title}</div>}
                      <div className="text-gray-500 text-xs truncate">{review.comment}</div>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(review.id)} className="text-red-500 hover:text-red-700 text-xs">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {reviews.length === 0 && <p className="text-center text-gray-400 py-8">No reviews yet.</p>}
        </div>
      )}
    </div>
  );
}
