import prisma  from "../db/client";
import {Post} from "types";
import {RepositoryResult} from "../types";
import {Result} from "@badrap/result";

export const postRepository = {

    async createPost(data: Post): RepositoryResult<Post> {
        try {
            return Result.ok(await prisma.post.create({
                data: data,
            }));
        } catch (error) {
            console.error(error);
            return Result.err(error);
        }
    },

    async deletePost(id: string): RepositoryResult<Post> {
        try {
            return Result.ok(await prisma.post.delete({
                where: {
                    id: id,
                }
            }));
        } catch (error) {
            console.error(error);
            return Result.err(error);
        }
    },

    async updatePost(id: string, data: Post): RepositoryResult<Post> {
        try {
            return Result.ok(await prisma.post.update({
                where: {
                    id: id,
                },
                data: data,
            }));
        } catch (error) {
            console.error(error);
            return Result.err(error);
        }
    },

    async getPost(id: string): RepositoryResult<Post> {
        try {
            return Result.ok(await prisma.post.findUniqueOrThrow({
                where: {
                    id: id,
                    deletedAt: null,
                }
            }));
        } catch (error) {
            console.error(error);
            return Result.err(error);
        }
    },

    async getPosts(): RepositoryResult<Post[]> {
        try {
            return Result.ok(await prisma.post.findMany({
                where: {
                    deletedAt: null,
                }
            }));
        } catch (error) {
            console.error(error);
            return Result.err(error);
        }
    },

    async getPostsPaginated(page: number, pageSize: number): RepositoryResult<Post[]> {
        try {
            return Result.ok(await prisma.post.findMany({
                skip: page * pageSize,
                take: pageSize,
                where: {
                    deletedAt: null,
                }
            }));
        } catch (error) {
            console.error(error);
            return Result.err(error);
        }
    },

    async getAmountOfPosts(): RepositoryResult<number> {
        try {
            return Result.ok(await prisma.post.count({
                where: {
                    deletedAt: null,
                }
            }));
        } catch (error) {
            console.error(error);
            return Result.err(error);
        }
    },

    async getPostsByCreator(creatorId: string): RepositoryResult<Post[]> {
        try {
            return Result.ok(await prisma.post.findMany({
                where: {
                    creatorId: creatorId,
                    deletedAt: null,
                }
            }));
        } catch (error) {
            console.error(error);
            return Result.err(error);
        }
    },

    async getPostsByApplicant(applicantId: string): RepositoryResult<Post[]> {
        try {
            return Result.ok(await prisma.post.findMany({
                where: {
                    applicants: {
                        some: {
                            id: applicantId,
                        }
                    },
                    deletedAt: null,
                }
            }));
        } catch (error) {
            console.error(error);
            return Result.err(error);
        }
    },

    async addApplicantToPost(postId: string, applicantId: string): RepositoryResult<Post> {
        try {
            return Result.ok(await prisma.post.update({
                where: {
                    id: postId,
                },
                data: {
                    applicants: {
                        connect: {
                            id: applicantId,
                        }
                    }
                }
            }));
        } catch (error) {
            console.error(error);
            return Result.err(error);
        }
    }
}