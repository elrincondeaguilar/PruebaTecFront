"use client";
import "../app/globals.css";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Contenedor con animación */}
      <motion.div
        className="bg-white p-10 rounded-lg shadow-lg text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido</h1>
        <p className="text-lg text-gray-600 mb-6">
          Explora nuestras publicaciones y usuarios.
        </p>

        {/* Botones de navegación */}
        <div className="flex space-x-4">
          <a
            href="/posts"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Ver Publicaciones
          </a>
          <a
            href="/users"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Ver Usuarios
          </a>
        </div>
      </motion.div>
    </div>
  );
}
