import type {
  MetaFunction,
  LoaderFunction,
  ActionFunction,
} from "@remix-run/node";
import { Board, Header } from "../components";
import { db } from "../services/db";
import { json, redirect } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// Define el tipo para la acción
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const actionType = form.get("actionType");

  if (actionType === "addTask") {
    const name = form.get("name") as string;
    const description = form.get("description") as string;

    await db.task.create({
      data: { name, description },
    });

    return redirect("/");
  }

  if (actionType === "updateTask") {
    const id = form.get("taskId") as string;
    const status = form.get("newStatus") as string;

    await db.task.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    return json({ success: true });
  }

  if (actionType === "updateTaskContent") {
    const id = form.get("taskId") as string;
    const name = form.get("name") as string;
    const description = form.get("description") as string;

    await db.task.update({
      where: { id: parseInt(id) },
      data: { name, description },
    });

    return json({ success: true });
  }

  if (actionType === "deleteTask") {
    const id = form.get("taskId") as string;

    await db.task.delete({
      where: { id: parseInt(id) },
    });

    return json({ success: true });
  }

  return json({ success: false });
};

// Define el tipo para el loader
export const loader: LoaderFunction = async () => {
  const tasks = await db.task.findMany();

  const tareasDesdeElEndpoint = tasks.map((task) => ({
    ...task,
    id: String(task.id),
  }));

  const categories = [
    {
      id: "PENDING",
      name: "Pendientes",
      tasks: tareasDesdeElEndpoint.filter((task) => task.status === "PENDING"),
    },
    {
      id: "IN_PROGRESS",
      name: "En progreso",
      tasks: tareasDesdeElEndpoint.filter(
        (task) => task.status === "IN_PROGRESS"
      ),
    },
    {
      id: "COMPLETED",
      name: "Hecho",
      tasks: tareasDesdeElEndpoint.filter(
        (task) => task.status === "COMPLETED"
      ),
    },
  ];

  return json({ categories });
};

export default function Index() {
  return (
    <div className="w-full bg-amber-100 h-dvh min-h-fit">
      <Header />
      <Board />
    </div>
  );
}
