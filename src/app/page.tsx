import { UsersListClient } from "@/components/UsersListClient";
import { fetchUsers } from "@/lib/api";

// SSR: fetch users on the server using Next.js Server Components
export default async function HomePage() {
  let users = [];
  let error: string | null = null;

  try {
    users = await fetchUsers();
  } catch {
    error = "Something went wrong";
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">All Users</h1>
        {!error && (
          <p className="text-slate-500 text-sm mt-1">
            {users.length} users loaded via SSR
          </p>
        )}
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl">
            ⚠️
          </div>
          <p className="text-red-600 font-semibold text-lg">{error}</p>
          <p className="text-slate-400 text-sm">Please try refreshing the page.</p>
        </div>
      ) : (
        <UsersListClient initialUsers={users} />
      )}
    </div>
  );
}
