import { Navigate } from "react-router";
import { useEffect } from "react";
import { useUserStore } from "../../store/userStore";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isLoggedIn, isInitialized, initializeAuth } =
    useUserStore();

  useEffect(() => {
    // Initialisiere Authentifizierung beim ersten Laden
    if (!isInitialized) {
      initializeAuth();
    }
  }, [isInitialized, initializeAuth]);

  if (!isInitialized || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
