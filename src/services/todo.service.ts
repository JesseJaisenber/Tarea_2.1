import { prisma } from "../db/client";
import { Todo } from "../interfaces/todo.interface";
import { randomUUID as uuid } from "node:crypto";
// import { v4 as uuid } from "uuid"; //? requiere de la instalacion de un paquete externo

// "base de datos"
// const todos: Todo[] = [];

export const getAll = async (): Promise<Todo[]> => {
  return await prisma.todo.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findById = async (id: string): Promise<Todo | null> => {
  return await prisma.todo.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const create = async (todo: Partial<Todo>): Promise<Todo> => {
  // const newTodo: Todo = {
  //   id: uuid(),
  //   title: todo.title!,
  //   description: todo.description ?? null,
  //   completed: !!todo.completed,
  // };

  const newTodo = { id: uuid(), ...todo } as Todo;

  
  return await prisma.todo.create({
    data: newTodo,
  });
};

export const update = async (
  todoId: string,
  payload: Partial<Todo>
): Promise<Todo | null> => {
  return await prisma.todo.update({
    where: {
      id: todoId,
    },
    data: payload,
  });
};

export const remove = async (id: string): Promise<boolean> => {
  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};
