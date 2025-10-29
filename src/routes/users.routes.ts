import { Router } from "express";
import {
  getAll,
  findById,
  create,
  update,
  remove,
} from "../controllers/user.controller";

// /users/....
const router = Router();

router.get("/", getAll);
router.get("/:id", findById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;

