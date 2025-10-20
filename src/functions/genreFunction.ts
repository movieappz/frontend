import type { ICategory } from "../interfaces/interfaces";

export const genreFunction = (genreIDs?: number[], categories?: ICategory[]): string => {
    if (!Array.isArray(genreIDs) || genreIDs.length === 0 || !categories) return "";
    return genreIDs
        .map((id) => categories.find((el) => el.id === id)?.name)
        .filter(Boolean)
        .join(", ");
};