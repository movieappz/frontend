import React, { useState } from "react";
import { StarIcon, StarFilledIcon } from "@radix-ui/react-icons";

interface StarRatingProps {
  rating: number;
  onRate: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRate,
  size = "md",
  readonly = false,
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const starSize = sizeClasses[size];

  const handleStarClick = (star: number, isLeftHalf: boolean) => {
    if (!readonly) {
      const value = isLeftHalf ? star - 0.5 : star;
      onRate(value);
    }
  };

  const handleMouseMove = (
    star: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!readonly) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const isLeftHalf = x < rect.width / 2;
      const value = isLeftHalf ? star - 0.5 : star;
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const currentRating = hoverRating || rating;
        const isFull = star <= currentRating;
        const isHalf = star - 0.5 === currentRating;

        return (
          <button
            key={star}
            type="button"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const isLeftHalf = x < rect.width / 2;
              handleStarClick(star, isLeftHalf);
            }}
            onMouseMove={(e) => handleMouseMove(star, e)}
            onMouseLeave={handleMouseLeave}
            disabled={readonly}
            className={`
              relative transition-all duration-200 
              ${!readonly ? "cursor-pointer hover:scale-110" : "cursor-default"}
            `}
            aria-label={`${star} Stern${star > 1 ? "e" : ""}`}
          >
            {isHalf ? (
              <div className="relative">
                <StarIcon className={`${starSize} !text-gray-400`} />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: "50%" }}
                >
                  <StarFilledIcon className={`${starSize} !text-yellow-400`} />
                </div>
              </div>
            ) : isFull ? (
              <StarFilledIcon className={`${starSize} !text-yellow-400`} />
            ) : (
              <StarIcon className={`${starSize} !text-gray-400`} />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
