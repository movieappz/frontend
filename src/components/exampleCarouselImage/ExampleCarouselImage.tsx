interface ExampleCarouselImageProps {
  text: string;
  imgUrl: string;
  className?: string;
}

export default function ExampleCarouselImage({
  text,
  imgUrl,
  className = "",
}: ExampleCarouselImageProps) {
  return (
    <img
      src={imgUrl}
      alt={text}
      loading="lazy"
      className={`block w-full h-full object-cover ${className}`}
      style={{ pointerEvents: "auto" }}
    />
  );
}
