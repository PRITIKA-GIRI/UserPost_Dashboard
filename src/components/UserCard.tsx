import Link from "next/link";
import { User } from "@/types";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-800 truncate">{user.name}</h3>
          <p className="text-slate-500 text-sm truncate">{user.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 rounded-lg px-3 py-2">
        <span>🏢</span>
        <span className="truncate">{user.company.name}</span>
      </div>

      <Link
        href={`/users/${user.id}`}
        className="w-full text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
      >
        View Posts →
      </Link>
    </div>
  );
}
