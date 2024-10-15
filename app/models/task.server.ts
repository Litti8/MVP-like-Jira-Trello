import { prisma } from '~/db.server';

// Create a new task
export async function createTask(name: string) {
  return prisma.task.create({
    data: {
      name,
    },
  });
}

// Read all tasks
export async function getTasks() {
  return prisma.task.findMany();
}

// Read a single task by ID
export async function getTaskById(id: number) {
  return prisma.task.findUnique({
    where: { id },
  });
}

// Update a task by ID
export async function updateTask(
  id: number,
  name: string,
  status: string,
  priority: string,
  description: string,
  user: string
) {
  return prisma.task.update({
    where: { id },
    data: {
      name,
      status,
      priority,
      description,
      user,
    },
  });
}

// Delete a task by ID
export async function deleteTask(id: number) {
  return prisma.task.delete({
    where: { id },
  });
}
