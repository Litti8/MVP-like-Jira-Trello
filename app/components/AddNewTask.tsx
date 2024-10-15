import { Form } from "@remix-run/react";
import { useState } from "react";

// Define los tipos para las props
interface AddNewTaskProps {
  addNewtask: boolean;
  handleCloseAdd: () => void;
}

export const AddNewTask: React.FC<AddNewTaskProps> = ({
  addNewtask,
  handleCloseAdd,
}) => {
  if (!addNewtask) {
    return null;
  }

  // Define los estados con tipos explícitos
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-start justify-center pt-10">
      <div className="flex flex-col gap-4 p-4 max-w-2xl w-full text-black bg-amber-100 rounded-md">
        <Form
          action="/?index"
          method="POST"
          className="bg-teal-500 p-6 rounded-lg shadow-md w-3/5 max-w-md mx-auto"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-white text-xl font-bold mb-2"
            >
              Tarea:
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 bg-slate-200"
              placeholder="Nombre de la tarea"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-white font-bold mb-2"
            >
              Descripcion:
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-black bg-slate-200"
              placeholder="Descripcion de la tarea"
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button
              name="actionType"
              value="addTask"
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Agregar
            </button>

            <button
              type="button" // Cambia a type="button" para evitar el envío del formulario
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleCloseAdd}
            >
              Cerrar
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
