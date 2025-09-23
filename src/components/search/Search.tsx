import { useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { mainContext, type MainContextProps } from "../../context/MainProvider";

export default function Search() {
  const navigate = useNavigate();
  const { searchRef, searchMovies } = useContext(
    mainContext
  ) as MainContextProps;
  const timeoutRef = useRef<any>(null);

  const handleChange = async () => {
    const val = (searchRef.current?.value || "").trim();

    navigate("/search");

    if (val.length > 0) {
      await searchMovies(val);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        if (searchRef.current) searchRef.current.value = "";
      }, 5000);
      if (val.length === 0) {
        navigate("/category/28");
      }
    } else {
      navigate("/category/28");
    }
  };

  return (
    <input
      type="text"
      ref={searchRef}
      onChange={handleChange}
      placeholder="Search Movie..."
      className="w-full sm:w-64 bg-white/90 text-[--color-brand-text] placeholder:text-[--color-brand-text]/60 border-2 border-[--color-brand-border] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[--color-brand-border]"
    />
  );
}
