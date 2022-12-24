import { Request, Response } from "express";
import UploadFile from "../../../helpers/aws/upload";
import { fetchAllToDos, fetchSingleToDo, deleteToDo as deleteSingleToDo, insertToDo as insertToDoModel, updateToDo as updateToDoModel } from "../model/todo.model";
import { v4 as uuid } from "uuid";

interface ReturnResponse {
    message: string;
    data: any[];
}

class ToDoController {
    getAllToDos = async (req: Request, res: Response): Promise<Response<ReturnResponse>> => {
        try {
            const { data: data } = await fetchAllToDos();
            if (data && data.length > 0) {
                return res.json({
                    message: "Records are available",
                    data: data,
                    success: true,
                });
            } else {
                return res.json({
                    message: "Records not Found!",
                    data: [],
                    success: false,
                });
            }
        } catch (err: any) {
            return res.send({
                message: err.message || "Something went Wrong.!",
                data: [],
                success: false,
            });
        }
    };

    getSingleToDo = async (req: Request, res: Response): Promise<Response<ReturnResponse>> => {
        try {
            const { params = {} } = req;
            const { data: data } = await fetchSingleToDo(params.id);
            if (data && data.length > 0) {
                return res.json({
                    message: "Records are available",
                    data: data,
                    success: true,
                });
            } else {
                return res.json({
                    message: "Records not Found!",
                    data: [],
                    success: false,
                });
            }
        } catch (err: any) {
            return res.send({
                message: err.message || "Something went Wrong.!",
                data: [],
                success: false,
            });
        }
    };

    insertToDo = async (req: Request, res: Response): Promise<Response<ReturnResponse>> => {
        try {
            const { body = {} } = req;

            if (body.image) {
                const bodyImage = body.image;
                const fileName = uuid();
                const extention = bodyImage.substring("data:image/".length, bodyImage.indexOf(";base64"));
                const imageToUpload = Buffer.from(bodyImage.split(",")[1], "base64");
                const uploadedImage = await UploadFile(`${fileName}.${extention}`, imageToUpload);
                body.image = uploadedImage;
            }

            const { success: success } = await insertToDoModel(body);
            if (success) {
                return res.json({
                    message: "Records Inserted Successfully.",
                    data: [],
                    success: true,
                });
            } else {
                return res.json({
                    message: "Something went Wrong.!",
                    data: [],
                    success: false,
                });
            }
        } catch (err: any) {
            return res.send({
                message: err.message || "Something went Wrong.!",
                data: [],
                success: false,
            });
        }
    };

    updateToDo = async (req: Request, res: Response): Promise<Response<ReturnResponse>> => {
        try {
            const { params = {}, body = {} } = req;
            
            if (body.image) {
                const bodyImage = body.image;
                const fileName = uuid();
                const extention = bodyImage.substring("data:image/".length, bodyImage.indexOf(";base64"));
                const imageToUpload = Buffer.from(bodyImage.split(",")[1], "base64");
                const uploadedImage = await UploadFile(`${fileName}.${extention}`, imageToUpload);
                body.image = uploadedImage;
            } else if (body.image === undefined) {
                delete body.image;
            } else {
                body.image = 'DELETE';
            }

            const { success: success } = await updateToDoModel(body, params.id);
            if (success) {
                return res.json({
                    message: "Records Updated Successfully.",
                    data: [],
                    success: true,
                });
            } else {
                return res.json({
                    message: "Something went Wrong.!",
                    data: [],
                    success: false,
                });
            }
        } catch (err: any) {
            return res.send({
                message: err.message || "Something went Wrong.!",
                data: [],
                success: false,
            });
        }
    };

    deleteToDo = async (req: Request, res: Response): Promise<Response<ReturnResponse>> => {
        try {
            const { params = {} } = req;
            const { success: success } = await deleteSingleToDo(params.id);
            if (success) {
                return res.json({
                    message: "Records deleted Successfully.",
                    data: [],
                    success: true,
                });
            } else {
                return res.json({
                    message: "Something went Wrong.!",
                    data: [],
                    success: false,
                });
            }
        } catch (err: any) {
            return res.send({
                message: err.message || "Something went Wrong.!",
                data: [],
                success: false,
            });
        }
    };
}
export default new ToDoController();
