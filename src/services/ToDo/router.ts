import express, { NextFunction, Request, Response } from "express";
import ToDoController from "./controller/todo.conroller";

const todoRouter = express.Router();

todoRouter.use((req: Request, res: Response, next: NextFunction): Response<void> | void => {
    return next();
});

todoRouter.get("/", ToDoController.getAllToDos);
todoRouter.get("/:id", ToDoController.getSingleToDo);
todoRouter.delete("/:id", ToDoController.deleteToDo);
todoRouter.post("/", ToDoController.insertToDo);
todoRouter.put("/:id", ToDoController.updateToDo);

export default todoRouter;
