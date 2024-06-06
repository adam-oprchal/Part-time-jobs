import {postRepository} from "./postRepository";
import {Request, Response} from "express";
import {Post} from "types";
import z from 'zod';
import {paginationSchema, postSchema} from "./schema";

export const postController = {
    createPost: async (request: Request, response: Response)=> {
        const parseResult = await postSchema.safeParseAsync(request.body)
        if (!parseResult.success) {
            response.status(400).send(parseResult.error);
            return;
        }

        const result = await postRepository.createPost(request.body);

        if (result.isOk) {
            response.send(result.value);
        } else {
            response.status(400).send("Bad request");
        }
    },

    deletePost: async (request: Request, response: Response)=> {
        const result = await postRepository.deletePost(request.params.id);

        if (result.isOk) {
            response.send(result);
        } else {
            response.status(400).send("Bad request");
        }
    },

    updatePost: async (request: Request, response: Response)=> {
        const parseResult = await postSchema.safeParseAsync(request.body)
        if (!parseResult.success) {
            response.status(400).send(parseResult.error)
            return;
        }

        const result = await postRepository.updatePost(request.params.id, request.body);

        if (result.isOk) {
            response.send(result);
        } else {
            response.status(400).send("Bad request");
        }
    },

    getPost: async (request: Request, response: Response)=> {
        const result = await postRepository.getPost(request.params.id);

        if (result.isOk) {
            response.send(result);
        } else {
            response.status(400).send("Bad request");
        }
    },

    getPostsPaginated: async (request: Request, response: Response)=> {
        const validRequest = await paginationSchema.safeParseAsync(request);
        if (!validRequest.success) {
            response.status(400).send("invalid request")
            return
        }

        const { page, pageSize } = validRequest.data.query

        const result = await postRepository.getPostsPaginated(page, pageSize);

        if (result.isOk) {
            response.send(result);
        } else {
            response.status(400).send("Bad request");
        }
    },

    getAmountOfPosts: async (request: Request, response: Response)=> {
        const result = await postRepository.getAmountOfPosts();

        if (result.isOk) {
            response.send({amount: result});
        } else {
            response.status(400).send("Bad request");
        }
    },

    getPostsByCreator: async (request: Request, response: Response)=> {
        const result = await postRepository.getPostsByCreator(request.params.creatorId);

        if (result.isOk) {
            response.send(result);
        } else {
            response.status(400).send("Bad request");
        }
    },

    getPostsByApplicant: async (request: Request, response: Response)=> {
        const result = await postRepository.getPostsByApplicant(request.params.applicantId);

        if (result.isOk) {
            response.send(result);
        } else {
            response.status(400).send("Bad request");
        }
    },

    applyForPost: async (request: Request, response: Response)=> {
        const result = await postRepository.addApplicantToPost(request.params.postId, request.params.applicantId);

        if (result.isOk) {
            response.send(result);
        } else {
            response.status(400).send("Bad request");
        }
    },
}