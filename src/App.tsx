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
import PageWrapper from "./components/pageWrapper/PageWrapper";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";

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
        <Route
          path="/category/:genreId"
          element={
            <PageWrapper>
              <MovieList />
            </PageWrapper>
          }
        />
        <Route
          path="/detail/:movieId"
          element={
            <PageWrapper>
              <MovieDetail />
            </PageWrapper>
          }
        />
        <Route
          path="/search"
          element={
            <PageWrapper>
              <MovieList />
            </PageWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />

        <Route
          path="/signup"
          element={
            <PageWrapper>
              <SignUp />
            </PageWrapper>
          }
        />
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
