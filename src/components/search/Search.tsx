import { useContext } from "react";
import { mainContext, type MainContextProps } from "../../context/MainProvider";

export default function Search() {
  const { searchRef, searchMovies } = useContext(
    mainContext
  ) as MainContextProps;

  // useEffect(() => {
  //   console.log(searchRef.current?.value);
  //   searchMovies(searchRef.current?.value);
  // }, []);

  return (
    <>
      <input
        type="text"
        ref={searchRef}
        onChange={() => searchMovies(searchRef.current?.value)}
        placeholder="search Movie..."
        className="w-full sm:w-64 bg-white/90 text-[--color-brand-text] placeholder:text-[--color-brand-text]/60 border-2 border-[--color-brand-border] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[--color-brand-border]"
      />
    </>
  );
}
