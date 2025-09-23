import { useContext } from "react";
import { useNavigate } from "react-router";
import { mainContext, type MainContextProps } from "../../context/MainProvider";

export default function Search() {
  const navigate = useNavigate();
  const { searchRef, searchMovies } = useContext(
    mainContext
  ) as MainContextProps;

  const handleChange = async () => {
    const val = (searchRef.current?.value || "").trim();
    if (val.length > 0) {
      await searchMovies(val);
      setTimeout(() => {
        if (searchRef?.current?.value === "") {
          window.location.reload();
          navigate("/category/28");
        }
      }, 5000);
    } else {
      navigate("/category/28");
    }
  };

  return (
    <input
      type="text"
      ref={searchRef}
      onChange={handleChange}
      placeholder="search Movie..."
      className="w-full sm:w-64 bg-white/90 text-[--color-brand-text] placeholder:text-[--color-brand-text]/60 border-2 border-[--color-brand-border] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[--color-brand-border]"
    />
  );
}
