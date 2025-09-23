import { useContext } from "react";
import { mainContext, type MainContextProps } from "../../context/MainProvider";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";
import ExampleCarouselImage from "../exampleCarouselImage/ExampleCarouselImage";

export default function Trending() {
  const { states } = useContext(mainContext) as MainContextProps;

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  console.log(states.movies);

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {states.movies.map((movie) => {
          const title = movie.title || movie.name || "Unknown";
          const imageUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image";

          return (
            <Carousel.Item key={movie.id}>
              <ExampleCarouselImage text={title} imgUrl={imageUrl} />
              <Carousel.Caption>
                <h3>{title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
}
