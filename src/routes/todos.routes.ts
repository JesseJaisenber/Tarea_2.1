import { Router } from "express";
// import * as TodoController from "../controllers/todo.controller";
import {
  getAll,
  findById,
  create,
  update,
  remove,
} from "../controllers/todo.controller";

// /todos/....
const router = Router();

router.get("/", getAll);
router.get("/:id", findById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
