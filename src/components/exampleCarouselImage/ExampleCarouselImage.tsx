interface ExampleCarouselImageProps {
  text: string;
  imgUrl: string | undefined;
}

export default function ExampleCarouselImage({
  text,
  imgUrl,
}: ExampleCarouselImageProps) {
  return (
    <img
      className="d-block w-100 h-50 border-2 border-red-800"
      src={imgUrl}
      alt={text}
    />
  );
}
