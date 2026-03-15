"use client";

import { useState, useEffect, useMemo } from "react";
import { fetchUsers } from "@/lib/api";
import { useUsersStore } from "@/store";
import { User } from "@/types";

export function useUsers() {
  const { users, setUsers } = useUsersStore();
  const [apiIsLoading, setApiIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (users.length > 0) return;
    setApiIsLoading(true);
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setError(null);
      })
      .catch(() => setError("Something went wrong"))
      .finally(() => setApiIsLoading(false));
  }, [users.length, setUsers]);

  const filteredUsers: User[] = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const q = searchQuery.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  return { users: filteredUsers, apiIsLoading, error, searchQuery, setSearchQuery };
}
