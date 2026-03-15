"use client";

import { useState, useMemo, useEffect } from "react";
import { User } from "@/types";
import { UserCard } from "./UserCard";
import { SearchBar } from "./ui/SearchBar";
import { useUsersStore } from "@/store"; 

export function UsersListClient({ initialUsers }: { initialUsers: User[] }) {
  const { users, setUsers } = useUsersStore(); 
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers, setUsers]);

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users.length ? users : initialUsers;
    const q = searchQuery.toLowerCase();
    const source = users.length ? users : initialUsers;
    return source.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, initialUsers, searchQuery]);

  return (
    <div>
      <div className="mb-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search by name or email..." />
        {searchQuery && (
          <p className="text-slate-400 text-sm mt-2">
            {filteredUsers.length} result{filteredUsers.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
          </p>
        )}
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 font-medium">No users match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}