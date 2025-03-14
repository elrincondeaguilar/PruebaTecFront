"use client";
import ErrorMessage from "@/components/ErrorMessage";
import Skeleton from "@/components/Skeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { fetchUsers } from "@/utils/fetchUsers";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam }) => fetchUsers({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.data.length ? lastPage.nextPage : undefined,
  });

  const users = data ? data.pages.flatMap((page) => page.data) : [];

  // Hook personalizado para el scroll infinito
  const lastUserRef = useInfiniteScroll(
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  );

  const filteredUsers = users.filter(
    (user: any) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <ErrorMessage message="Error al cargar los usuarios. Intenta de nuevo." />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Lista de Usuarios</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar usuario..."
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
      />
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton width="100%" height="60px" />
          <Skeleton width="100%" height="60px" />
          <Skeleton width="100%" height="60px" />
        </div>
      ) : (
        <ul className="space-y-4">
          {filteredUsers.map((user: any, index) => (
            <motion.li
              key={user.id}
              ref={index === filteredUsers.length - 1 ? lastUserRef : null}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition duration-300"
            >
              <a
                href={`/users/${user.id}`}
                className="block text-lg font-semibold text-blue-600 hover:underline"
              >
                {user.name}
              </a>
              <p className="text-gray-600">
                @{user.username} | {user.email}
              </p>
            </motion.li>
          ))}
        </ul>
      )}
      {isFetchingNextPage && (
        <div className="flex justify-center mt-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}
