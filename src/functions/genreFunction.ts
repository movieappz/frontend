import { useContext } from "react";
import { mainContext, type MainContextProps } from "../context/MainProvider";



export const genreFunction = (genreIDs?: number[]): string => {
    const { states } = useContext(mainContext) as MainContextProps;
    if (!Array.isArray(genreIDs) || genreIDs.length === 0) return "";
    return genreIDs
        .map((id) => states.categories.find((el) => el.id === id)?.name)
        .filter(Boolean)
        .join(", ");
};