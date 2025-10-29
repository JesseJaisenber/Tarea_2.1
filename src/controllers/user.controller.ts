import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/user.service";
import { validateUser, validateUserPartial } from "../schemas/user.schema";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserService.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({
        message: "El ID debe ser un número válido",
      });
    }

    const user = await UserService.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: `Usuario con id ${id} no encontrado`,
      });
    }

    res.json(user);
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
    const { success, error, data } = validateUser(req.body);

    if (!success) {
      return res.status(400).json(error.issues);
    }

    const newUser = await UserService.create(data);

    res.status(201).json(newUser);
  } catch (error: any) {
    // Error de Prisma cuando el email ya existe
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "El email ya está en uso",
      });
    }
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({
        message: "El ID debe ser un número válido",
      });
    }

    const { success, error, data } = validateUserPartial(req.body);

    if (!success) {
      return res.status(400).json(error.issues);
    }

    const user = await UserService.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "El usuario no existe",
      });
    }

    const updatedUser = await UserService.update(userId, data);
    return res.status(200).json(updatedUser);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "El email ya está en uso",
      });
    }
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
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({
        message: "El ID debe ser un número válido",
      });
    }

    const user = await UserService.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: `Usuario con id ${id} no encontrado`,
      });
    }

    const deleted = await UserService.remove(userId);

    if (deleted) {
      return res.status(200).json({
        message: "Usuario eliminado exitosamente",
      });
    } else {
      return res.status(500).json({
        message: "Error al eliminar el usuario",
      });
    }
  } catch (error) {
    next(error);
  }
};

