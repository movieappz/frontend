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
    <input
      type="text"
      ref={inputRef}
      onChange={handleChange}
      placeholder="Search Movie..."
      className="w-full sm:w-64 bg-white/90 text-[--color-brand-text] placeholder:text-[--color-brand-text]/60 border-2 border-[--color-brand-border] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[--color-brand-border]"
    />
  );
}
