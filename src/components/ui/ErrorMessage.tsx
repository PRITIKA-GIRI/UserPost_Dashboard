export function ErrorMessage({ message = "Something went wrong" }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl">
        ⚠️
      </div>
      <p className="text-red-600 font-semibold text-lg">{message}</p>
      <p className="text-slate-400 text-sm">Please try refreshing the page.</p>
    </div>
  );
}
