'use client';
import { useState, useEffect } from 'react';
import { Review } from '@/types';

interface ReviewSectionProps {
  productId: string;
  productName: string;
}

export function ReviewSection({ productId, productName }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({ total: 0, average: 0, distribution: [0, 0, 0, 0, 0] });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ customerName: '', customerEmail: '', rating: 5, title: '', comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`/api/reviews?productId=${productId}`)
      .then(r => r.json())
      .then(data => {
        setReviews(data);
        const total = data.length;
        const average = total > 0 ? data.reduce((s: number, r: Review) => s + r.rating, 0) / total : 0;
        const dist = [0, 0, 0, 0, 0];
        data.forEach((r: Review) => { dist[r.rating - 1]++; });
        setStats({ total, average: Math.round(average * 10) / 10, distribution: dist });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, productId, productName }),
      });
      if (res.ok) {
        const newReview = await res.json();
        setReviews(prev => [newReview, ...prev]);
        setSubmitted(true);
        setForm({ customerName: '', customerEmail: '', rating: 5, title: '', comment: '' });
        const total = reviews.length + 1;
        const average = (stats.average * reviews.length + form.rating) / total;
        const dist = [...stats.distribution];
        dist[form.rating - 1]++;
        setStats({ total, average: Math.round(average * 10) / 10, distribution: dist });
      }
    } catch {}
    setSubmitting(false);
  };

  const StarRating = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <svg key={star} className={`${size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );

  if (loading) return <div className="py-8 text-center text-gray-400">Loading reviews...</div>;

  return (
    <div className="border-t border-gray-200 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">CUSTOMER REVIEWS</h2>
        <button onClick={() => setShowForm(!showForm)} className="text-sm font-medium text-purple-600 hover:text-purple-700">
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {stats.total > 0 && (
        <div className="flex flex-col sm:flex-row gap-8 mb-8 p-6 bg-gray-50 rounded-xl">
          <div className="text-center sm:text-left">
            <div className="text-4xl font-bold text-gray-900">{stats.average}</div>
            <StarRating rating={Math.round(stats.average)} size="lg" />
            <p className="text-sm text-gray-500 mt-1">{stats.total} review{stats.total !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map(star => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-8">{star}★</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${stats.total > 0 ? (stats.distribution[star - 1] / stats.total) * 100 : 0}%` }} />
                </div>
                <span className="text-xs text-gray-500 w-8 text-right">{stats.distribution[star - 1]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Review Submitted!</h3>
              <p className="text-gray-500 text-sm mb-4">Thank you for your review. It will appear after verification.</p>
              <button onClick={() => { setShowForm(false); setSubmitted(false); }} className="text-purple-600 hover:text-purple-700 text-sm font-medium">Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="font-semibold mb-4">Write Your Review</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating *</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} type="button" onClick={() => setForm(p => ({ ...p, rating: star }))} className="p-0.5">
                      <svg className={`w-8 h-8 ${star <= form.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-300'} hover:text-amber-400 transition-colors`} viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label><input required type="text" value={form.customerName} onChange={e => setForm(p => ({ ...p, customerName: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input required type="email" value={form.customerEmail} onChange={e => setForm(p => ({ ...p, customerEmail: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" /></div>
              </div>
              <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">Review Title</label><input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Summarize your experience" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" /></div>
              <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">Your Review *</label><textarea required rows={4} value={form.comment} onChange={e => setForm(p => ({ ...p, comment: e.target.value }))} placeholder="Tell others about your experience with this product..." className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none" /></div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-800">Cancel</button>
                <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50">
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No reviews yet. Be the first to review this product!</p>
        ) : reviews.map(review => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <StarRating rating={review.rating} />
                  {review.verified && <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">Verified Purchase</span>}
                </div>
                {review.title && <h4 className="font-semibold text-sm">{review.title}</h4>}
              </div>
              <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{review.comment}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">by {review.customerName}</span>
              <button className="text-xs text-gray-400 hover:text-purple-600 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.228.22.442.406.639l2.25 2.25" /></svg>
                Helpful ({review.helpful})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
