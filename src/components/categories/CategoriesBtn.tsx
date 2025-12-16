import { Link } from "react-router";

export default function CategoriesBtn() {
  return (
    <Link
      to="/categories"
      className="inline-block px-6 py-2 bg-gradient-to-r from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] !text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 !no-underline"
    >
      Categories
    </Link>
  );
}
