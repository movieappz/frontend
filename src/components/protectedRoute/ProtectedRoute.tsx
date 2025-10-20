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
      <div className="min-h-screen bg-[rgb(var(--bg-primary))] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[rgb(var(--accent-primary))] border-t-transparent mx-auto mb-4"></div>
          <p className="text-[rgb(var(--text-secondary))]">Wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
