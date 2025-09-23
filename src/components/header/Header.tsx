import Search from "../search/Search";
import CategoriesBtn from "../categories/CategoriesBtn";

export default function Header() {
  return (
    <div>
      <h2>Welcome !</h2>
      <Search />
      <CategoriesBtn />
    </div>
  );
}
