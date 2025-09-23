import { useContext } from "react";
import { mainContext, type MainContextProps } from "../../context/MainProvider";
import type { ICategory } from "../../interfaces/interfaces";
import { NavLink } from "react-router";

export default function CategoriesBtn() {
  const { states } = useContext(mainContext) as MainContextProps;

  return (
    <>
      <ul className="flex gap-2 overflow-x-auto no-scrollbar py-2">
        {states.categories.map((category: ICategory) => {
          return (
            <li key={category.id} className="shrink-0">
              <NavLink
                className={"text-red-400!"}
                to={`/category/${category.id}`}
              >
                <button className="btn whitespace-nowrap bg-transparent text-[--color-brand-text] border-2 border-[--color-brand-border] hover:bg-[--color-brand-border]/40 focus:outline-none focus:ring-2 focus:ring-[--color-brand-border] px-3 py-1 rounded-md text-sm active:text-[--color-brand-bg]!">
                  {category.name}
                </button>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
}
