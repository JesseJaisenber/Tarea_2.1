import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.status || 500).json({
    message: error.message || "Error interno del servidor",
  });
};
