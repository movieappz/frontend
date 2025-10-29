export default function Footer() {
  return (
    <footer className="mt-auto py-6 bg-[rgb(var(--bg-secondary))] border-t-2 border-[rgb(var(--border))]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[rgb(var(--text-primary))] text-sm">
            © {new Date().getFullYear()} Movie App - TMDB API
          </div>
          <div className="flex gap-4"></div>
        </div>
      </div>
    </footer>
  );
}
