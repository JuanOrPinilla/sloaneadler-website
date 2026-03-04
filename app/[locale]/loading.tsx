export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <div className="w-px h-16 bg-[#b8a07e] animate-pulse" />
        <p className="text-[10px] uppercase tracking-widest text-slate-400">
          Loading
        </p>
      </div>
    </div>
  )
}
