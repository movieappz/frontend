import { useContext } from "react";
import { mainContext, type MainContextProps } from "../../context/MainProvider";
import type { ICategory } from "../../interfaces/interfaces";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export default function Categories() {
  const { states } = useContext(mainContext) as MainContextProps;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))] pt-24 pb-12">
      <div className="container-responsive">
        <div className="mb-4 flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-12 h-12 bg-[rgb(var(--bg-secondary))] border-2 border-[rgb(var(--border))] hover:bg-[rgb(var(--accent-primary))]/20 !text-[rgb(var(--text-primary))] rounded-lg transition-colors"
            aria-label="Zurück"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
        </div>
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[rgb(var(--text-primary))] mb-4">
            Kategorien
          </h1>
          <p className="text-lg text-[rgb(var(--text-secondary))]">
            Entdecke Filme nach Genre
          </p>
        </div>

        {/* Genres Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[rgb(var(--text-primary))] mb-8 pb-4 border-b-2 border-[rgb(var(--border))]">
            Genres
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {states.categories.map((category: ICategory) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="inline-block px-6 py-3 bg-gradient-to-r from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] !text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 !no-underline text-center"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
