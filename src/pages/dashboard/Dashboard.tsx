import { useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import { NavLink } from "react-router";

export default function Dashboard() {
  const { user, isLoading, reloadUser } = useUserStore();

  useEffect(() => {
    if (!user && !isLoading) {
      reloadUser();
    }
  }, [user, isLoading, reloadUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[rgb(var(--bg-primary))] pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[rgb(var(--accent-primary))] border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[rgb(var(--bg-primary))] pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-[rgb(var(--bg-tertiary))] rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-[rgb(var(--text-muted))]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))] mb-4">
              you are not logged in
            </h1>
            <p className="text-[rgb(var(--text-secondary))]">
              sign in to access your dashboard
            </p>
          </div>
        </div>
      </div>
    );
  }

  const favoriteCount = user.favorites?.length || 0;

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))] pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[rgb(var(--text-primary))] mb-2">
              Welcome back {user.username}
            </h1>
          </div>

          <div className="card p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-[rgb(var(--text-secondary))]">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[rgb(var(--accent-primary))] rounded-full"></div>
                <span className="text-[rgb(var(--text-secondary))]">
                  {favoriteCount}{" "}
                  {favoriteCount === 1 ? "Favorit" : "Favoriten"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <NavLink
              to="/favorites"
              className="group card p-6 hover:scale-105 transition-all duration-200 !no-underline"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold !no-underline">
                    Your Favorites
                  </h3>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    {favoriteCount} {favoriteCount === 1 ? "Film" : "Films"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-[rgb(var(--text-muted))]">
                {favoriteCount === 0
                  ? "still no favorite movies"
                  : "view and manage your favorite movies"}
              </p>
            </NavLink>

            <NavLink
              to="/"
              className="group card p-6 hover:scale-105 transition-all duration-200 !no-underline"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))]">
                    New Movies
                  </h3>
                  <p className="text-sm text-[rgb(var(--text-secondary))]"></p>
                </div>
              </div>
              <p className="text-sm text-[rgb(var(--text-muted))]">
                Discover the latest movies added to our collection
              </p>
            </NavLink>

            <div className="card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))]">
                    Statistics
                  </h3>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Your account statistics
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[rgb(var(--text-secondary))]">
                    Favorite:
                  </span>
                  <span className="font-medium text-[rgb(var(--text-primary))]">
                    {favoriteCount}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[rgb(var(--text-secondary))]">
                    Member since:{" "}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
