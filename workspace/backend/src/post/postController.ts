import {Post} from "types";
import {postRepository} from "./postRepository";
import {Request, Response} from "express";

export const postController = {
    createPost: async (request: Request, response: Response)=> {
        try {
            const result = await postRepository.createPost(request.body);
            response.send(result)
        } catch (error) {
            console.error(error);
            response.status(500);
        }
    }
}