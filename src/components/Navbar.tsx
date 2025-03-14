"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // Iconos para el menú

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-lg ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold">
            FrontEnd App
          </a>

          {/* Menú de Escritorio */}
          <div className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-gray-200 transition">
              Inicio
            </a>
            <a href="/posts" className="hover:text-gray-200 transition">
              Publicaciones
            </a>
            <a href="/users" className="hover:text-gray-200 transition">
              Usuarios
            </a>
          </div>

          {/* Botón de Menú Hamburguesa (Móvil) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Menú Móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-blue-700 text-white px-4 py-3 space-y-2"
          >
            <a
              href="/"
              className="block py-2 hover:bg-blue-800 rounded-lg px-3"
            >
              Inicio
            </a>
            <a
              href="/posts"
              className="block py-2 hover:bg-blue-800 rounded-lg px-3"
            >
              Publicaciones
            </a>
            <a
              href="/users"
              className="block py-2 hover:bg-blue-800 rounded-lg px-3"
            >
              Usuarios
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
