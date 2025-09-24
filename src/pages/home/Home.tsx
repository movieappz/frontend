import Trending from "../../components/trending/Trending";
import { useContext } from "react";
import { mainContext, type MainContextProps } from "../../context/MainProvider";
import SkeletonGrid from "../../components/SkeletonCard/SkeletonGrid";

export default function Home() {
  const { states } = useContext(mainContext) as MainContextProps;

  return (
    <div className="container-responsive">
      {states.loading ? (
        <SkeletonGrid count={10} />
      ) : (
        <Trending />
      )}
    </div>
  );
}
