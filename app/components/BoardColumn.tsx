import { Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { TaskCard } from "./TaskCard";

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
}

interface BoardColumnProps {
  droppableId: string;
  name: string;
  setSelectedTask: (task: Task) => void;
  tasks: Task[];
}

export const BoardColumn: React.FC<BoardColumnProps> = ({
  droppableId,
  name,
  setSelectedTask,
  tasks,
}) => {
  return (
    <div
      className={`w-full bg-orange-300 p-4 flex flex-col gap-4 rounded-md border-t-4 shadow ${
        droppableId === "PENDING"
          ? "border-green-500"
          : droppableId === "IN_PROGRESS"
          ? "border-yellow-300"
          : "border-red-600"
      }`}
    >
      <h2 className="text-black text-xl">
        <strong>{name}</strong>
      </h2>
      <StrictModeDroppable droppableId={droppableId}>
        {(provided) => (
          <div
            className="flex flex-col gap-4 p-2 grow"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {/* Recorremos las tareas y renderizamos una card draggable por cada una. */}
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => setSelectedTask(task)} // Mantenemos el manejador de click
                  >
                    <TaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {/* Este es el espacio donde se mostrará la tarea cuando se esté arrastrando. Es algo que provee react-beautiful-dnd */}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  );
};
