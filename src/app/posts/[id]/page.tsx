"use client";
import { useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { fetchComments } from "@/utils/fetchComments";
import { fetchPosts } from "@/utils/fetchPosts";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "@/components/Skeleton";
import { h1 } from "framer-motion/client";

export default function PostDetail({ params }: { params: { id: string } }) {
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", params.id],
    queryFn: () => fetchPosts({ id: params.id }),
  });

  const {
    data: comments,
    isLoading: loadingComments,
    error: errorComments,
  } = useQuery({
    queryKey: ["comments", params.id],
    queryFn: () => fetchComments(params.id),
  });

  const [newComments, setNewComments] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  // 🔹 Agregar comentario localmente
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !comment.trim()) return;

    const newComment = {
      id: Date.now(), // ID temporal
      name,
      body: comment,
    };

    setNewComments([...newComments, newComment]);
    setName("");
    setComment("");
  };

  // 🔹 Eliminar comentario localmente
  const handleDeleteComment = (id: number) => {
    setNewComments(newComments.filter((comment) => comment.id !== id));
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="animate-bounce text-center">
          <h1 className="text-3xl font-bold text-center mb-6">
            Cargando publicación...
          </h1>
        </div>
        <Skeleton width="80%" height="30px" />
        <Skeleton width="100%" height="20px" />
        <Skeleton width="100%" height="20px" />
        <Skeleton width="100%" height="20px" />
      </div>
    );
  }

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-3xl font-bold text-center mb-4">{post.title}</h1>
      <p className="text-lg text-gray-700 mb-6">{post.body}</p>

      {/* Sección de comentarios */}
      <h2 className="text-2xl font-semibold mt-6 border-b pb-2">Comentarios</h2>

      {loadingComments ? (
        <div className="space-y-2">
          <Skeleton width="100%" height="50px" />
          <Skeleton width="100%" height="50px" />
          <Skeleton width="100%" height="50px" />
        </div>
      ) : errorComments ? (
        <ErrorMessage message={errorComments.message} />
      ) : (
        <ul className="mt-4 space-y-4">
          {/* Comentarios desde la API */}
          {comments?.map((comment: any) => (
            <li key={comment.id} className="p-3 bg-gray-100 rounded-lg border">
              <p className="font-semibold text-gray-800">{comment.name}</p>
              <p className="text-gray-600">{comment.body}</p>
            </li>
          ))}
          {/* Comentarios agregados localmente */}
          <AnimatePresence>
            {newComments.map((comment: any) => (
              <motion.li
                key={comment.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-3 bg-green-100 rounded-lg border flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-green-800">{comment.name}</p>
                  <p className="text-gray-700">{comment.body}</p>
                </div>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="ml-4 px-3 py-1 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                >
                  Eliminar
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      {/* Formulario para agregar un comentario */}
      <h2 className="text-2xl font-semibold mt-6">Añadir Comentario</h2>
      <form onSubmit={handleAddComment} className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Escribe tu comentario..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-28"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Añadir Comentario
        </button>
      </form>

      <div className="text-center mt-6">
        <a
          href="/posts"
          className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
        >
          Volver a publicaciones
        </a>
      </div>
    </motion.div>
  );
}
