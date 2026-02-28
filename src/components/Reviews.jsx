import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations';
import { seedReviews } from '../data/reviews';

const MAX_CHARS = 300;

function StarRating({ value, onChange, readOnly }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => !readOnly && onChange(star)}
          className={`text-xl focus:outline-none focus:ring-0 ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110 transition-transform'}`}
          aria-label={readOnly ? `${value} stars` : `Rate ${star} stars`}
        >
          <span className={star <= value ? 'text-amber-400' : 'text-gray-600'}>★</span>
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  const initial = review.name.charAt(0).toUpperCase();
  return (
    <div className="flex-shrink-0 w-[280px] min-h-[220px] bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-md">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-emerald-600/50 flex items-center justify-center text-emerald-300 font-bold">
          {initial}
        </div>
        <div>
          <p className="font-medium text-gray-100">{review.name}</p>
          <StarRating value={review.rating} readOnly />
        </div>
      </div>
      <p className="text-gray-300 text-sm line-clamp-4">{review.text}</p>
    </div>
  );
}

export default function Reviews() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const [reviews, setReviews] = useState(seedReviews);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setReviews(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    const trimmedName = name.trim();
    const trimmedText = text.trim();
    if (!trimmedName || !trimmedText || trimmedText.length > MAX_CHARS) return;
    if (rating < 1 || rating > 5) return;
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, rating, text: trimmedText }),
      });
      if (!res.ok) throw new Error('Failed to submit');
      const review = await res.json();
      setReviews((prev) => [review, ...prev]);
      setName('');
      setRating(0);
      setText('');
    } catch {
      setSubmitError(true);
    }
  };

  const charCount = text.length;

  return (
    <section id="reviews" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 text-center mb-10"
          style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          {t('reviews.title')}
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 items-center">
          {/* Static form card (left) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-shrink-0 w-full lg:w-80 lg:min-w-[320px]"
          >
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-100 mb-4">{t('reviews.formTitle')}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="review-name" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('reviews.nameLabel')}
                  </label>
                  <input
                    id="review-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('reviews.placeholderName')}
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t('reviews.ratingLabel')}
                  </label>
                  <StarRating value={rating} onChange={setRating} readOnly={false} />
                </div>
                <div>
                  <label htmlFor="review-text" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('reviews.reviewLabel')}
                  </label>
                  <textarea
                    id="review-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={t('reviews.placeholderReview')}
                    maxLength={MAX_CHARS}
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {t('reviews.charCount').replace('{count}', charCount).replace('{max}', MAX_CHARS)}
                  </p>
                </div>
                {submitError && (
                  <p className="text-sm text-red-400">{t('reviews.submitError') || 'Failed to submit. Try again.'}</p>
                )}
                <button
                  type="submit"
                  disabled={!name.trim() || !text.trim() || rating < 1 || text.length > MAX_CHARS}
                  className="w-full py-2.5 rounded-lg font-medium bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {t('reviews.submit')}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Carousel area (right) */}
          <div className="flex-1 min-w-0 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-48 text-gray-500">
                ...
              </div>
            ) : reviews.length === 0 ? (
              <div className="flex items-center justify-center h-48 text-gray-500">
                {t('reviews.noReviews')}
              </div>
            ) : (
              <div className="overflow-hidden">
                <div
                  className="flex gap-4 w-max"
                  style={{
                    animation: 'reviews-scroll 40s linear infinite'
                  }}
                >
                  {[...reviews, ...reviews].map((review, i) => (
                    <ReviewCard key={`${review.id}-${i}`} review={review} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes reviews-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
