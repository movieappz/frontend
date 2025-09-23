import { useContext } from "react";
import { mainContext, type MainContextProps } from "../../context/MainProvider";
import type { ICategory } from "../../interfaces/interfaces";
import { NavLink } from "react-router";

export default function CategoriesBtn() {
  const { states } = useContext(mainContext) as MainContextProps;

  return (
    <>
      <ul className="flex justify-between align-sub w-100 flex-wrap">
        {states.categories.map((category: ICategory) => {
          return (
            <div key={category.id}>
              <NavLink to={`/category/${category.id}`}>
                <button key={category.id}>{category.name}</button>
              </NavLink>
            </div>
          );
        })}
      </ul>
    </>
  );
}
