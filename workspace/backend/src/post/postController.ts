import {postRepository} from "./postRepository";
import {Request, Response} from "express";
import {Post} from "types";
import z from 'zod';
import {postSchema} from "./schema";

export const postController = {
    createPost: async (request: Request, response: Response)=> {
        const parseResult = await postSchema.safeParseAsync(request.body)
        if (!parseResult.success) {
            response.status(400).send(parseResult.error)
            return;
        }

        const result = await postRepository.createPost(request.body);
        response.send(result)
    },

    deletePost: async (request: Request, response: Response)=> {
        const result = await postRepository.deletePost(request.params.id);
        response.send(result)
    },

    updatePost: async (request: Request, response: Response)=> {
        const parseResult = await postSchema.safeParseAsync(request.body)
        if (!parseResult.success) {
            response.status(400).send(parseResult.error)
            return;
        }

        const result = await postRepository.updatePost(request.params.id, request.body);
        response.send(result)
    },

    getPost: async (request: Request, response: Response)=> {
        const result = await postRepository.getPost(request.params.id);
        response.send(result)
    },

    getPostsPaginated: async (request: Request, response: Response)=> {
        let page: number;
        let pageSize: number;
        try {
            page = parseInt(request.query.page as string);
            pageSize = parseInt(request.query.pageSize as string);
            const assert = require('chai').assert;
            assert(page);
            assert(pageSize);
        } catch (error) {
            response.status(400).send("Invalid query parameters");
            return;
        }
        const result = await postRepository.getPostsPaginated(page, pageSize);
        response.send(result)
    },

    getAmountOfPosts: async (request: Request, response: Response)=> {
        const result = await postRepository.getAmountOfPosts();
        response.send({amount: result})
    },

    getPostsByCreator: async (request: Request, response: Response)=> {
        const result = await postRepository.getPostsByCreator(request.params.creatorId);
        response.send(result)
    },

    getPostsByApplicant: async (request: Request, response: Response)=> {
        const result = await postRepository.getPostsByApplicant(request.params.applicantId);
        response.send(result)
    },

    applyForPost: async (request: Request, response: Response)=> {
        const result = await postRepository.addApplicantToPost(request.params.postId, request.params.applicantId);
        response.send(result)
    },
}