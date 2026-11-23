interface RatingStarsProps {
  rating: number;
}

export function RatingStars({ rating }: RatingStarsProps) {
  const filled = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-slate-700">
      <span aria-hidden="true" className="tracking-tight text-amber-500">
        {'★'.repeat(filled)}
        <span className="text-slate-300">{'★'.repeat(5 - filled)}</span>
      </span>
      <span>
        <span className="font-semibold">{rating.toFixed(1)}</span>
        <span className="sr-only"> out of 5 stars</span>
        <span aria-hidden="true" className="text-slate-500"> / 5</span>
      </span>
    </span>
  );
}
