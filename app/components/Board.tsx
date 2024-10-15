import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useLoaderData, useRevalidator } from "@remix-run/react";

import { BoardColumn } from "./BoardColumn";
import { TaskDetail } from "./TaskDetail";
import { AddNewTask } from "./AddNewTask";

// Definimos el tipo para las categorías y tareas
interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
}

interface Category {
  id: string;
  name: string;
  tasks: Task[];
}

export const Board = () => {
  const { categories } = useLoaderData<{ categories: Category[] }>();
  const revalidator = useRevalidator();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [addNewTask, setAddNewTask] = useState<boolean>(false);

  // Esta función se ejecuta cuando se arrastra una tarea.
  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || destination.droppableId === source.droppableId) {
      return;
    }

    await fetch("/?index", {
      method: "PATCH",
      body: new URLSearchParams({
        actionType: "updateTask",
        taskId: result.draggableId,
        newStatus: destination.droppableId,
      }),
    });

    revalidator.revalidate();
  };

  const handleClose = () => {
    setIsEditing(false);
    setSelectedTask(null);
  };

  const handleCloseAdd = () => {
    setAddNewTask(false);
  };

  return (
    <>
      <div className="flex justify-center items-center mt-6 ">
        <button
          className="bg-amber-500 text-white py-3 px-6 text-xl rounded hover:bg-amber-600"
          onClick={() => setAddNewTask(true)}
        >
          Agregar tarea
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row gap-4 p-4">
          {categories?.map(({ id, name, tasks }) => (
            <BoardColumn
              droppableId={id}
              key={id}
              name={name}
              setSelectedTask={setSelectedTask}
              tasks={tasks}
            />
          ))}
        </div>
      </DragDropContext>

      <AddNewTask
        addNewtask={addNewTask}
        handleCloseAdd={handleCloseAdd}
      />
    </>
  );
};
