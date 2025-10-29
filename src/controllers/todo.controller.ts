import { NextFunction, Request, Response } from "express";
import * as TodoService from "../services/todo.service";
import { validateTodo, validateTodoPartial } from "../schemas/todo.schema";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // todas las tareas
  try {
    const todos = await TodoService.getAll(); // retorna una promesa
    res.json(todos);
  } catch (error) {
    next(error); // pasando la responsabilidad de controlar el error a un middleware
    // res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const todo = await TodoService.findById(id);

    if (!todo) {
      return res.status(404).json({
        message: `Tarea con id ${id} no encontrada`,
      });
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validar el body de la solicitud
    const { success, error, data } = validateTodo(req.body);

    if (!success) {
      return res.status(400).json(error.issues);
    }

    const newTodo = await TodoService.create(data);

    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const { success, error, data } = validateTodoPartial(req.body);

    if (!success) {
      return res.status(400).json(error.issues);
    }

    const result = await TodoService.findById(id);

    if (!result) {
      return res.status(404).json({
        message: "La tarea no existe",
      });
    }

    const todo = await TodoService.update(id, data);
    return res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const todo = await TodoService.findById(id);

    if (!todo) {
      return res.status(404).json({
        message: `Tarea con id ${id} no encontrada`,
      });
    }

    const deleted = await TodoService.remove(id);

    if (deleted) {
      return res.status(200).json({
        message: "Tarea eliminada exitosamente",
      });
    } else {
      return res.status(500).json({
        message: "Error al eliminar la tarea",
      });
    }
  } catch (error) {
    next(error);
  }
};
