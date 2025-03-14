"use client";
import { useRouter } from "next/navigation";
import ErrorMessage from "@/components/ErrorMessage";
import Skeleton from "@/components/Skeleton";
import { fetchUsers } from "@/utils/fetchUsers";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function UserDetail({ params }: { params: { id: string } }) {
  const router = useRouter();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user", params.id],
    queryFn: () => fetchUsers({ id: params.id }),
  });

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="animate-bounce text-center">
          <h1 className="text-3xl font-bold mb-6">Cargando usuario...</h1>
        </div>
        <Skeleton width="80%" height="30px" />
        <Skeleton width="100%" height="20px" />
        <Skeleton width="100%" height="20px" />
        <Skeleton width="100%" height="20px" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <ErrorMessage message={error.message} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <p className="text-gray-600 text-lg">Usuario no encontrado</p>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-3xl font-bold text-center mb-4">
        {user.name} <span className="text-gray-500">(@{user.username})</span>
      </h1>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Email:</span> {user.email}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Teléfono:</span> {user.phone}
      </p>
      <p className="text-lg text-gray-700 mb-6">
        <span className="font-semibold">Website:</span>{" "}
        <a
          href={`https://${user.website}`}
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          {user.website}
        </a>
      </p>

      {/* 🔹 Botón para volver a la lista de usuarios */}
      <div className="text-center mt-6">
        <motion.button
          onClick={() => router.push("/users")}
          className="flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} /> Volver a usuarios
        </motion.button>
      </div>
    </motion.div>
  );
}
