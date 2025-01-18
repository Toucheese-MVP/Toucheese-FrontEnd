import { useState } from "react";

type StarRatingProps = {
  maxStars?: number;
  onChange?: (rating: number) => void;
};

export default function StarRating({
  maxStars = 5,
  onChange,
}: StarRatingProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxStars }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          className={`text-3xl transition-colors ${
            (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
          }`}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => {
            setRating(star);
            onChange?.(star);
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}
