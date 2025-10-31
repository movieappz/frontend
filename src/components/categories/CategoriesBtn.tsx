import { useContext } from "react";
import { mainContext, type MainContextProps } from "../../context/MainProvider";
import type { ICategory } from "../../interfaces/interfaces";
import { NavLink } from "react-router";

export default function CategoriesBtn() {
  const { states } = useContext(mainContext) as MainContextProps;

  return (
    <>
      <ul className="flex gap-2 overflow-x-auto no-scrollbar pt-2 p-0 m-0">
        {states.categories.map((category: ICategory) => {
          return (
            <li key={category.id} className="shrink-0">
              <NavLink
                to={`/category/${category.id}`}
                className={"!text-green-500"}
              >
                <button className="btn-category">{category.name}</button>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
}
