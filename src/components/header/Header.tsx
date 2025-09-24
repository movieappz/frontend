import Search from "../search/Search";
import CategoriesBtn from "../categories/CategoriesBtn";
import { Link } from "react-router";

export default function Header() {
  return (
    <div className="container-responsive">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <Link to={"/"}>
          <button>🏠</button>
        </Link>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[--color-brand-border]">
          Welcome!
        </h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Search />
          <CategoriesBtn />
        </div>
      </div>
    </div>
  );
}
