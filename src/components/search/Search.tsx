import { useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { mainContext, type MainContextProps } from "../../context/MainProvider";

export default function Search() {
  const navigate = useNavigate();
  const { searchMovies, clearSearch } = useContext(
    mainContext
  ) as MainContextProps;
  const timeoutRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    if (val.length === 0) {
      clearSearch();
      navigate("/category/28");
      return;
    }

    await searchMovies(val);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (inputRef.current) inputRef.current.value = "";
    }, 5000);

    navigate("/search");
  };

  return (
    <form action="#" className="relative mx-auto w-full max-w-lg">
      <input
        type="search"
        aria-label="Suche nach Filmen"
        ref={inputRef}
        onChange={handleChange}
        placeholder="Film suchen..."
        className="peer cursor-pointer relative z-10 h-11 w-11 sm:h-12 sm:w-12 rounded-full border-2 bg-transparent pl-11 sm:pl-12 outline-none transition-all duration-300 ease-out
                   text-[--color-brand-text] placeholder:text-[--color-brand-text]/60 border-[--color-brand-border]
                   focus:w-full focus:cursor-text focus:border-[--color-brand-border] focus:pl-14 focus:pr-4
                   bg-white/90"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute inset-y-0 my-auto h-7 w-11 sm:h-8 sm:w-12 border-r border-transparent stroke-[--color-brand-text] px-3 peer-focus:border-[--color-brand-border]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </form>
  );
}
