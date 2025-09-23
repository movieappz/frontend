import { useContext } from "react";
import { mainContext, type MainContextProps } from "../../context/MainProvider";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";
import ExampleCarouselImage from "../exampleCarouselImage/ExampleCarouselImage";
import { NavLink } from "react-router";

export default function Trending() {
  const { states } = useContext(mainContext) as MainContextProps;

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  console.log(states.movies);

  return (
    <>
      <div className="container-responsive">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-[--color-brand-border]">
          Trending
        </h3>
      </div>
      <Carousel
        className="container-responsive"
        activeIndex={index}
        onSelect={handleSelect}
        indicators
        fade
      >
        {states.movies.map((movie) => {
          const title = movie.title || movie.name || "Unknown";
          const imageUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image";

          return (
            <Carousel.Item key={movie.id}>
              <NavLink to={`/detail/${movie.id}`}>
                <ExampleCarouselImage text={title} imgUrl={imageUrl} />
                <Carousel.Caption className="backdrop-blur-sm">
                  <h3 className="text-[--color-brand-border] text-base sm:text-xl font-semibold">
                    {title}
                  </h3>
                </Carousel.Caption>
              </NavLink>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
}
