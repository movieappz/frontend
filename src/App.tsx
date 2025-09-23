import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import "./App.css";
import Layout from "./layout/Layout";
import MainProvider from "./context/MainProvider";
import Home from "./pages/home/Home";
import MovieList from "./pages/movieList/MovieList";
import MovieDetail from "./pages/movieDetail/MovieDetail";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <MainProvider>
            <Layout />
          </MainProvider>
        }
      >
        <Route index element={<Home />} />
        <Route path="/category/:genreId" element={<MovieList />} />
        <Route path="/detail/:movieId" element={<MovieDetail />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
