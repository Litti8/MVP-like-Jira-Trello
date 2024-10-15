import { useState } from "react";
import { TaskDetail } from "./TaskDetail";

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
}

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  null;
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleClose = () => {
    setIsEditing(false);
    setSelectedTask(null);
  };

  return (
    <div className="bg-teal-500 text-white p-4 flex justify-between items-center rounded-md">
      <p
        className="text-lg cursor-pointer"
        onClick={() => setSelectedTask(task)}
      >
        {task.name}
      </p>
      <button
        className="bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600"
        onClick={() => setSelectedTask(task)}
      >
        Detalles
      </button>

      <TaskDetail
        isEditing={isEditing}
        selectedTask={selectedTask}
        setIsEditing={setIsEditing}
        handleClose={handleClose}
      />
    </div>
  );
};
