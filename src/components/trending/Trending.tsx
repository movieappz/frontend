import { useContext, useState } from "react";
import { mainContext, type MainContextProps } from "../../context/MainProvider";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "../exampleCarouselImage/ExampleCarouselImage";
import { NavLink } from "react-router";

export default function Trending() {
  const { states } = useContext(mainContext) as MainContextProps;
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: number) => setIndex(selectedIndex);

  return (
    <div className="container-responsive my-6">
      <div className="relative left-1/2 -translate-x-1/2 w-screen overflow-hidden">
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          indicators
          fade
          className="w-full h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[80vh] xl:h-[85vh] overflow-hidden"
        >
          {states.movies.map((movie) => {
            const title = movie.title || movie.name || "Unknown";
            const imageUrl = movie.poster_path
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image";

            return (
              <Carousel.Item key={movie.id} className="relative w-full h-full">
                <NavLink
                  to={`/detail/${movie.id}`}
                  className="block w-full h-full"
                >
                  <ExampleCarouselImage
                    text={title}
                    imgUrl={imageUrl}
                    className="w-full h-full object-cover object-top"
                  />

                  <Carousel.Caption className="absolute bottom-6 left-6 right-6 bg-black/45 backdrop-blur-sm p-4 rounded-md">
                    <h6 className="text-white text-lg sm:text-2xl md:text-4xl font-bold truncate">
                      {title}
                    </h6>
                  </Carousel.Caption>
                </NavLink>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
