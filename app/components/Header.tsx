import React, { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-teal-700 p-4 flex justify-between items-center relative">
      <h1 className="text-3xl text-white">Gestor de tareas</h1>

      <button
        onClick={toggleMenu}
        className="text-white focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Menú desplegable */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-48 mr-2 w-48 bg-teal-700 rounded-md shadow-lg z-10 border-solid border-2 border-slate-200/70">
          <ul className="py-2">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-white-800 hover:bg-teal-500"
                onClick={() => setIsMenuOpen(false)} // Cerrar el menú al hacer clic
              >
                Usuario
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-white-800 hover:bg-teal-500"
                onClick={() => setIsMenuOpen(false)} // Cerrar el menú al hacer clic
              >
                Mis tareas
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-white-800 hover:bg-teal-500"
                onClick={() => setIsMenuOpen(false)} // Cerrar el menú al hacer clic
              >
                Cerrar sesión
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
