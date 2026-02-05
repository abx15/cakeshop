import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ThumbsUp, Check, Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Review } from '@/types';
import RatingStars from '@/components/common/RatingStars';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ProductReviewsProps {
  reviews: Review[];
  productRating: number;
  reviewCount: number;
}

// Photo Gallery Modal
function PhotoGallery({ 
  photos, 
  initialIndex, 
  onClose 
}: { 
  photos: string[]; 
  initialIndex: number; 
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
        className="absolute left-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <motion.img
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        src={photos[currentIndex]}
        alt="Review photo"
        className="max-w-full max-h-[80vh] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={(e) => { e.stopPropagation(); handleNext(); }}
        className="absolute right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 flex gap-2">
        {photos.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
            className={cn(
              'w-2 h-2 rounded-full transition-colors',
              idx === currentIndex ? 'bg-white' : 'bg-white/40'
            )}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Review Card Component
function ReviewCard({ review, onHelpful }: { review: Review; onHelpful: (id: string) => void }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-6"
      >
        <div className="flex items-start gap-4">
          <img
            src={review.userAvatar}
            alt={review.userName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-semibold">{review.userName}</h4>
                <div className="flex items-center gap-2">
                  <RatingStars rating={review.rating} size="sm" />
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
              </div>
              {review.verified && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Verified
                </span>
              )}
            </div>

            {review.title && (
              <h5 className="font-medium text-foreground mb-1">{review.title}</h5>
            )}

            <p className="text-muted-foreground mb-3">{review.comment}</p>

            {/* Review Photos */}
            {review.photos && review.photos.length > 0 && (
              <div className="flex gap-2 mb-3 flex-wrap">
                {review.photos.map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => openGallery(idx)}
                    className="w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-colors"
                  >
                    <img
                      src={photo}
                      alt={`Review photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => onHelpful(review.id)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              Helpful ({review.helpful})
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {galleryOpen && review.photos && (
          <PhotoGallery
            photos={review.photos}
            initialIndex={galleryIndex}
            onClose={() => setGalleryOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Write Review Form
function WriteReviewForm({ onSubmit }: { onSubmit: () => void }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (comment.length < 10) {
      toast.error('Please write at least 10 characters');
      return;
    }
    toast.success('Thank you for your review!');
    setRating(0);
    setTitle('');
    setComment('');
    setIsExpanded(false);
    onSubmit();
  };

  return (
    <div className="glass-card p-6">
      <h4 className="font-semibold mb-4">Write a Review</h4>
      
      {!isExpanded ? (
        <Button onClick={() => setIsExpanded(true)} className="gradient-primary text-white">
          Share Your Experience
        </Button>
      ) : (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Star Rating */}
          <div>
            <label className="text-sm font-medium mb-2 block">Your Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1"
                >
                  <Star
                    className={cn(
                      'w-6 h-6 transition-colors',
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-muted-foreground/30'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-medium mb-2 block">Review Title (Optional)</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              maxLength={100}
            />
          </div>

          {/* Comment */}
          <div>
            <label className="text-sm font-medium mb-2 block">Your Review</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience..."
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {500 - comment.length} characters remaining
            </p>
          </div>

          {/* Photo Upload Placeholder */}
          <div>
            <label className="text-sm font-medium mb-2 block">Add Photos (Optional)</label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer">
              <Camera className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload photos</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="gradient-primary text-white">
              Submit Review
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsExpanded(false)}>
              Cancel
            </Button>
          </div>
        </motion.form>
      )}
    </div>
  );
}

export default function ProductReviews({ reviews, productRating, reviewCount }: ProductReviewsProps) {
  const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set());
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'helpful'>('helpful');

  // Calculate rating breakdown
  const ratingBreakdown = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    const percentage = reviewCount > 0 ? Math.round((count / reviewCount) * 100) : 0;
    return { stars, count, percentage };
  });

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter((r) => (filterRating ? r.rating === filterRating : true))
    .sort((a, b) => {
      if (sortBy === 'helpful') return b.helpful - a.helpful;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const handleHelpful = (reviewId: string) => {
    if (helpfulReviews.has(reviewId)) {
      toast.info('You already marked this as helpful');
      return;
    }
    setHelpfulReviews((prev) => new Set(prev).add(reviewId));
    toast.success('Thanks for your feedback!');
  };

  // Get all photos from reviews
  const allPhotos = reviews.flatMap((r) => r.photos || []);

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* Rating Summary */}
      <div className="space-y-6">
        <div className="glass-card p-6">
          <div className="text-center mb-6">
            <span className="text-5xl font-bold text-primary">{productRating}</span>
            <div className="flex justify-center my-2">
              <RatingStars rating={productRating} size="lg" />
            </div>
            <span className="text-muted-foreground">{reviewCount} reviews</span>
          </div>
          <div className="space-y-2">
            {ratingBreakdown.map((item) => (
              <button
                key={item.stars}
                onClick={() => setFilterRating(filterRating === item.stars ? null : item.stars)}
                className={cn(
                  'w-full flex items-center gap-2 p-1 rounded transition-colors',
                  filterRating === item.stars ? 'bg-primary/10' : 'hover:bg-muted'
                )}
              >
                <span className="w-4 text-sm">{item.stars}</span>
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="w-10 text-sm text-muted-foreground text-right">
                  {item.count}
                </span>
              </button>
            ))}
          </div>
          {filterRating && (
            <button
              onClick={() => setFilterRating(null)}
              className="w-full mt-3 text-sm text-primary hover:underline"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Customer Photos */}
        {allPhotos.length > 0 && (
          <div className="glass-card p-6">
            <h4 className="font-semibold mb-4">Customer Photos</h4>
            <div className="grid grid-cols-3 gap-2">
              {allPhotos.slice(0, 6).map((photo, idx) => (
                <div key={idx} className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={photo}
                    alt={`Customer photo ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform cursor-pointer"
                  />
                </div>
              ))}
            </div>
            {allPhotos.length > 6 && (
              <p className="text-sm text-muted-foreground mt-2 text-center">
                +{allPhotos.length - 6} more photos
              </p>
            )}
          </div>
        )}

        {/* Write Review */}
        <WriteReviewForm onSubmit={() => {}} />
      </div>

      {/* Reviews List */}
      <div className="md:col-span-2 space-y-4">
        {/* Sort Controls */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-muted-foreground">
            {filteredReviews.length} {filteredReviews.length === 1 ? 'review' : 'reviews'}
            {filterRating && ` with ${filterRating} stars`}
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'helpful')}
            className="bg-background border border-border rounded-lg px-3 py-2 text-sm"
          >
            <option value="helpful">Most Helpful</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <ReviewCard 
              key={review.id} 
              review={{
                ...review,
                helpful: helpfulReviews.has(review.id) ? review.helpful + 1 : review.helpful
              }}
              onHelpful={handleHelpful}
            />
          ))
        ) : (
          <div className="glass-card p-8 text-center">
            <p className="text-muted-foreground mb-4">
              {filterRating 
                ? `No reviews with ${filterRating} stars yet.`
                : 'No reviews yet. Be the first to review!'
              }
            </p>
            {filterRating && (
              <Button variant="outline" onClick={() => setFilterRating(null)}>
                View All Reviews
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}