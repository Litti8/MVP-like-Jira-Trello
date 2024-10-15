import { useState } from "react";
import { useRevalidator } from "@remix-run/react";

// Definimos el tipo para la tarea
interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
}

interface TaskDetailProps {
  isEditing: boolean;
  selectedTask: Task | null;
  setIsEditing: (isEditing: boolean) => void;
  handleClose: () => void;
}

export const TaskDetail: React.FC<TaskDetailProps> = ({
  isEditing,
  selectedTask,
  setIsEditing,
  handleClose,
}) => {
  if (!selectedTask) {
    return null;
  }

  const revalidator = useRevalidator();
  const [inputValueName, setInputValueName] = useState<string>(
    selectedTask.name
  );
  const [inputValueDescription, setInputValueDescription] = useState<string>(
    selectedTask.description
  );

  const handleTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueName(e.target.value);
  };

  const handleTaskDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueDescription(e.target.value);
  };

  const handleDeleteTask = async (task: Task) => {
    await fetch("/?index", {
      method: "DELETE",
      body: new URLSearchParams({
        actionType: "deleteTask",
        taskId: task.id,
      }),
    });
    revalidator.revalidate();
    handleClose();
  };

  const handleSaveTask = async (
    taskId: string,
    name: string,
    description: string
  ) => {
    await fetch("/?index", {
      method: "PATCH",
      body: new URLSearchParams({
        actionType: "updateTaskContent",
        taskId: taskId,
        name: name,
        description: description,
      }),
    });
    revalidator.revalidate();
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-teal-500 rounded-lg shadow-lg max-w-lg text-black w-screen">
        <div className="flex justify-between items-center gap-4 p-4">
          <input
            className={`bg-teal-500 text-2xl text-white px-2 py-1 w-full ${
              isEditing ? "border bg-teal-600" : ""
            }`}
            disabled={!isEditing}
            value={inputValueName}
            onChange={handleTaskName}
          />
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
          >
            Editar
          </button>
        </div>
        <hr />
        <div className="p-4">
          <input
            className={`bg-teal-500 text-xl text-white px-2 py-1 w-full ${
              isEditing ? "border bg-teal-600" : ""
            }`}
            value={inputValueDescription}
            disabled={!isEditing}
            onChange={handleTaskDescription}
          />
        </div>
        <hr />
        <div className="flex justify-between p-4 gap-2">
          <button
            onClick={() => handleDeleteTask(selectedTask)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Eliminar
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => handleClose()}
              className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
            >
              Cerrar
            </button>
            <button
              onClick={() =>
                handleSaveTask(
                  selectedTask.id,
                  inputValueName,
                  inputValueDescription
                )
              }
              className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
