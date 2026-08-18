'use client';
import { useState, useEffect } from 'react';
import { Review } from '@/types';

export function HomepageReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then(data => { setReviews(data.filter((r: Review) => r.status === 'approved')); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <svg key={star} className={`w-4 h-4 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );

  if (loading) return null;
  if (reviews.length === 0) return null;

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold uppercase tracking-wide">
          WHAT COLLECTORS SAY
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.slice(0, 6).map(review => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={review.rating} />
              {review.verified && (
                <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">Verified</span>
              )}
            </div>
            {review.title && <h4 className="font-semibold text-sm mb-1">{review.title}</h4>}
            <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">{review.comment}</p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs">
                  {review.customerName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900">{review.customerName}</p>
                  <p className="text-xs text-gray-400">{review.productName}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
