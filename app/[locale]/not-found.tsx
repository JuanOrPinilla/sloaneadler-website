import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-light mb-4" style={{ fontFamily: 'Crimson Pro, serif' }}>404</h1>
        <h2 className="text-xl uppercase tracking-widest mb-4 text-[#b8a07e]">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for is not available.
        </p>
        <Link 
          href="/"
          className="px-6 py-2 bg-[#1a2332] text-white text-sm uppercase tracking-wider hover:opacity-90 inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
