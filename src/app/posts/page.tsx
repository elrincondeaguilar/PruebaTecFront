"use client";
import ErrorMessage from "@/components/ErrorMessage";
import Skeleton from "@/components/Skeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { fetchPosts } from "@/utils/fetchPosts";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

const PostsPage = () => {
  const [search, setSearch] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => fetchPosts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.data.length ? lastPage.nextPage : undefined,
  });

  const posts = data ? data.pages.flatMap((page) => page.data) : [];

  // Hook personalizado para el scroll infinito
  const lastPostRef = useInfiniteScroll(
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  );

  const filteredPosts = posts.filter((post: any) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <ErrorMessage message="Error al cargar las publicaciones. Intenta de nuevo." />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Publicaciones</h1>

      {/* Input de búsqueda */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar publicación..."
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
      />

      {/* Skeletons mientras carga la primera página */}
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton width="100%" height="60px" />
          <Skeleton width="100%" height="60px" />
          <Skeleton width="100%" height="60px" />
        </div>
      ) : (
        <ul className="space-y-4">
          {filteredPosts.map((post: any, index) => (
            <motion.li
              key={post.id}
              ref={index === filteredPosts.length - 1 ? lastPostRef : null}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition duration-300"
            >
              <a
                href={`/posts/${post.id}`}
                className="block text-lg font-semibold text-blue-600 hover:underline"
              >
                {post.title}
              </a>
            </motion.li>
          ))}
        </ul>
      )}

      {/* Spinner de carga */}
      {isFetchingNextPage && (
        <div className="flex justify-center mt-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default PostsPage;
