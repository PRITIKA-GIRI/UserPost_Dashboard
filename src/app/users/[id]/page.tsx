import { fetchUserById } from "@/lib/api";
import { notFound } from "next/navigation";
import { UserPostsClient } from "@/components/UserPostsClient";
import Link from "next/link";

export default async function UserPostsPage({
    params,
}: {
    params: { id: string };
}) {
    const userId = Number(params.id);
    if (isNaN(userId)) notFound();

    let user = null;
    let error = null;

    try {
        user = await fetchUserById(userId);
    } catch {
        error = "Something went wrong";
    }

    if (!user) {
        return (
            <div className="text-center py-20">
                <p className="text-red-600 font-semibold text-lg">
                    {error ?? "User not found"}
                </p>
                <Link href="/" className="text-blue-600 text-sm mt-2 inline-block">
                    ← Back to Users
                </Link>
            </div>
        );
    }

    return (
        <div>
            <Link href="/" className="text-blue-600 text-sm mb-6 inline-block hover:underline">
                ← Back to Users
            </Link>
            <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">{user.name}</h1>
                        <p className="text-slate-500 text-sm">{user.email}</p>
                        <p className="text-slate-400 text-sm">🏢 {user.company.name}</p>
                    </div>
                </div>
            </div>
            <UserPostsClient userId={userId} />
        </div>
    );
}