import { TODO } from "../../../helpers/connection/collection.name";
import { db } from "../../../helpers/connection";

interface ReturnResponse {
    update?: boolean;
    success?: boolean;
    data: any[];
}

interface ToDo {
    name?: string;
    description?: string;
    image?: string;
}

export const fetchAllToDos = async (): Promise<ReturnResponse> => {
    return await new Promise(async (resolve, reject) => {
        try {
            let queryStr = `SELECT * FROM ${TODO} ORDER BY id DESC`;

            db.query(queryStr, [], (err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ success: true, data: result });
                }
            });
        } catch (error: any) {
            reject(error);
        }
    });
};

export const fetchSingleToDo = async (id: string): Promise<ReturnResponse> => {
    return await new Promise(async (resolve, reject) => {
        try {
            let queryStr = `SELECT * FROM ${TODO} WHERE id = ${id}`;

            db.query(queryStr, [], (err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ success: true, data: result });
                }
            });
        } catch (error: any) {
            reject(error);
        }
    });
};

export const insertToDo = async (data: ToDo): Promise<ReturnResponse> => {
    return await new Promise(async (resolve, reject) => {
        try {
            let queryStr = `INSERT INTO ${TODO} SET ?`;

            db.query(queryStr, data, (err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ success: true, data: result });
                }
            });
        } catch (error: any) {
            reject(error);
        }
    });
};

export const updateToDo = async (data: ToDo, id: string): Promise<ReturnResponse> => {
    return await new Promise(async (resolve, reject) => {
        try {
            let queryStr = data.image ? `UPDATE ${TODO} SET name=?, description=?, image=?  WHERE id = ${id}` : `UPDATE ${TODO} SET name=?, description=?  WHERE id = ${id}`;
            let queryData = data.image ? data.image !== 'DELETE' ? [data.name, data.description, data.image] : [data.name, data.description, null] : [data.name, data.description];
            
            db.query(queryStr, queryData, (err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ success: true, data: result });
                }
            });
        } catch (error: any) {
            reject(error);
        }
    });
};

export const deleteToDo = async (id: string): Promise<ReturnResponse> => {
    return await new Promise(async (resolve, reject) => {
        try {
            let queryStr = `DELETE FROM ${TODO} WHERE id = ${id}`;

            db.query(queryStr, [], (err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ success: true, data: result });
                }
            });
        } catch (error: any) {
            reject(error);
        }
    });
};
