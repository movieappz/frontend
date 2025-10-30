import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { NavLink } from "react-router";

export default function Dashboard() {
  const { user, isLoading, reloadUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!user && !isLoading) {
      reloadUser();
    }
    if (user) {
      setNewUsername(user.username);
    }
  }, [user, isLoading, reloadUser]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    setTimeout(() => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }, 1000);

    // In einer echten Implementierung würden wir das Bild zum Server hochladen:
    // const formData = new FormData();
    // formData.append('profileImage', file);
    // axios.post('/api/users/profile-image', formData)
    //   .then(response => {
    //     setProfileImage(response.data.imageUrl);
    //     setIsUploading(false);
    //   })
    //   .catch(error => {
    //     console.error('Error uploading image:', error);
    //     setIsUploading(false);
    //   });
  };

  const handleUpdateUsername = () => {
    setIsEditing(false);
  };

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
            <div className="w-24 h-24 mx-auto mb-6 bg-[rgb(var(--bg-tertiary))] rounded-full flex items-center justify-center shadow-lg">
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
            <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))] mb-4 animate-fadeIn">
              you are not logged in
            </h1>
            <p className="text-[rgb(var(--text-secondary))] animate-slideUp">
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
          {/* Welcome Section with Animation */}
          <div className="mb-8 animate-fadeIn">
            <h1 className="text-4xl font-bold text-[rgb(var(--text-primary))] mb-2 animate-slideUp">
              Welcome back {user.username}
            </h1>
          </div>

          {/* Profile Card with Shadow and Animation */}
          <div className="card p-8 mb-8 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border))]">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              {/* Profile Image with Upload */}
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-[rgb(var(--accent-primary))] transition-transform duration-300 hover:scale-105">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity duration-300">
                  {isUploading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <span>Upload</span>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>

              {/* User Info with Edit Option */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="px-3 py-1 rounded border border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))]"
                      />
                      <button
                        onClick={handleUpdateUsername}
                        className="px-3 py-1 bg-[rgb(var(--accent-primary))] text-white rounded hover:bg-opacity-90 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setNewUsername(user.username);
                        }}
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-opacity-90 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold text-[rgb(var(--text-primary))]">
                        {user.username}
                      </h2>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-[rgb(var(--accent-primary))] hover:text-opacity-80 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                <p className="text-[rgb(var(--text-secondary))]">
                  {user.email}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-[rgb(var(--accent-primary))] bg-opacity-10 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-[rgb(var(--accent-primary))] rounded-full"></div>
                    <span className="text-[rgb(var(--text-secondary))]">
                      {favoriteCount}{" "}
                      {favoriteCount === 1 ? "Favorit" : "Favoriten"}
                    </span>
                  </div>
                  <div className="text-sm text-[rgb(var(--text-muted))]">
                    Mitglied seit{" "}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cards Grid with Enhanced Animations and Shadows */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <NavLink
              to="/favorites"
              className="group card p-6 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border))] hover:scale-105 !no-underline transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold !no-underline text-[rgb(var(--text-primary))]">
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
              className="group card p-6 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border))] hover:scale-105 !no-underline transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
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
          </div>
        </div>
      </div>
    </div>
  );
}
