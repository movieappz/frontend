interface ExampleCarouselImageProps {
  text: string;
  imgUrl: string | undefined;
}

export default function ExampleCarouselImage({
  text,
  imgUrl,
}: ExampleCarouselImageProps) {
  return (
    <img className="d-block w-100 object-cover" src={imgUrl} alt={text} />
  );
}
