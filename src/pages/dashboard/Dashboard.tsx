import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { NavLink } from "react-router";
import axios from "axios";
import { AUTH_HEADER } from "../../context/MainProvider";
import {
  HeartFilledIcon,
  VideoIcon,
  StarFilledIcon,
  ClockIcon,
  ActivityLogIcon,
  Pencil1Icon,
  CheckIcon,
  Cross2Icon,
  UploadIcon,
} from "@radix-ui/react-icons";

export default function Dashboard() {
  const { user, isLoading, reloadUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [watchedCount, setWatchedCount] = useState(0);
  const [totalWatchtime, setTotalWatchtime] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    if (!user && !isLoading) {
      reloadUser();
    }
    if (user) {
      setNewUsername(user.username);
      setWatchedCount(user.watchedMovies?.length || 0);
      setRatingCount(user.ratings?.length || 0);
    }
  }, [user, isLoading, reloadUser]);

  useEffect(() => {
    const calculateWatchtime = async () => {
      if (!user || !user.favorites || user.favorites.length === 0) {
        setTotalWatchtime(0);
        return;
      }

      try {
        const movieDetailsPromises = user.favorites.map((movieId) =>
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?language=de-DE`,
            { headers: AUTH_HEADER }
          )
        );

        const responses = await Promise.all(movieDetailsPromises);
        const totalMinutes = responses.reduce((sum, response) => {
          const runtime = response.data.runtime || 0;
          return sum + runtime;
        }, 0);

        setTotalWatchtime(totalMinutes);
      } catch (error) {
        console.error("Error calculating watchtime:", error);
        setTotalWatchtime(0);
      }
    };

    calculateWatchtime();
  }, [user?.favorites]);

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
    <div className="min-h-screen bg-[rgb(var(--bg-primary))] pt-24 pb-12">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section with Animation */}
          <div className="mb-8 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold !text-[rgb(var(--text-primary))] mb-2 animate-slideUp">
              Willkommen zurück, {user.username}!
            </h1>
            <p className="!text-[rgb(var(--text-secondary))] text-lg">
              Hier ist deine persönliche Übersicht
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <NavLink
              to="/favorites"
              className="bg-gradient-to-br from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] rounded-xl p-6 shadow-lg text-white hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <HeartFilledIcon className="w-8 h-8" />
                <span className="text-3xl font-bold">{favoriteCount}</span>
              </div>
              <p className="text-sm opacity-90">Favoriten</p>
            </NavLink>

            <NavLink
              to="/watched"
              className="bg-gradient-to-br from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] rounded-xl p-6 shadow-lg text-white hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <VideoIcon className="w-8 h-8" />
                <span className="text-3xl font-bold">{watchedCount}</span>
              </div>
              <p className="text-sm opacity-90">Angesehen</p>
            </NavLink>

            <div className="bg-gradient-to-br from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] rounded-xl p-6 shadow-lg text-white">
              <div className="flex items-center justify-between mb-2">
                <ClockIcon className="w-8 h-8" />
                <span className="text-3xl font-bold">
                  {totalWatchtime > 0
                    ? `${Math.floor(totalWatchtime / 60)}h ${
                        totalWatchtime % 60
                      }m`
                    : "0h"}
                </span>
              </div>
              <p className="text-sm opacity-90">Watchtime</p>
            </div>

            <div className="bg-gradient-to-br from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] rounded-xl p-6 shadow-lg text-white">
              <div className="flex items-center justify-between mb-2">
                <StarFilledIcon className="w-8 h-8" />
                <span className="text-3xl font-bold">{ratingCount}</span>
              </div>
              <p className="text-sm opacity-90">Bewertungen</p>
            </div>
          </div>

          {/* Profile Card with Shadow and Animation */}
          <div className="bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border))] p-8 mb-8 shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold !text-[rgb(var(--text-primary))] mb-6 flex items-center gap-2">
              <ActivityLogIcon className="w-6 h-6" />
              Profil Details
            </h2>

            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Profile Image with Upload */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg border-4 border-[rgb(var(--accent-primary))] transition-transform duration-300 hover:scale-105">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] flex items-center justify-center">
                      <span className="text-white font-bold text-4xl">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <label className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white opacity-0 group-hover:opacity-100 rounded-2xl cursor-pointer transition-opacity duration-300">
                  {isUploading ? (
                    <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <>
                      <UploadIcon className="w-6 h-6 mb-1" />
                      <span className="text-xs">Upload</span>
                    </>
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
              <div className="flex-1 space-y-4">
                <div>
                  <label className="text-sm !text-[rgb(var(--text-secondary))] mb-1 block">
                    Username
                  </label>
                  <div className="flex items-center gap-3">
                    {isEditing ? (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          className="input flex-1 !text-[rgb(var(--text-primary))]"
                        />
                        <button
                          onClick={handleUpdateUsername}
                          className="p-2 bg-[rgb(var(--accent-primary))] text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <CheckIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setNewUsername(user.username);
                          }}
                          className="p-2 bg-gray-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <Cross2Icon className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-xl font-semibold !text-[rgb(var(--text-primary))] flex-1">
                          {user.username}
                        </span>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="p-2 !text-[rgb(var(--accent-primary))] hover:bg-[rgb(var(--accent-primary))]/10 rounded-lg transition-colors"
                        >
                          <Pencil1Icon className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm !text-[rgb(var(--text-secondary))] mb-1 block">
                    E-Mail
                  </label>
                  <p className="text-lg !text-[rgb(var(--text-primary))]">
                    {user.email}
                  </p>
                </div>

                <div>
                  <label className="text-sm !text-[rgb(var(--text-secondary))] mb-1 block">
                    Mitglied seit
                  </label>
                  <p className="text-lg !text-[rgb(var(--text-primary))]">
                    {new Date(user.createdAt).toLocaleDateString("de-DE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
