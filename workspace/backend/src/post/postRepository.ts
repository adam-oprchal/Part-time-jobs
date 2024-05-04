import prisma  from "../db/client";
import {Post} from "types";

export const postRepository = {

    async createPost(data: Post): Promise<Post> {
        return prisma.post.create({
            data: data,
        });
    },

    async deletePost(id: string): Promise<Post> {
        return prisma.post.delete({
            where: {
                id: id,
            }
        });
    },

    async updatePost(id: string, data: Post): Promise<Post> {
        return prisma.post.update({
            where: {
                id: id,
            },
            data: data,
        });
    },

    async getPost(id: string): Promise<Post> {
        return prisma.post.findUnique({
            where: {
                id: id,
                deletedAt: null,
            }
        });
    },

    async getPostsPaginated(page: number, pageSize: number): Promise<Post[]> {
        return prisma.post.findMany({
            skip: page * pageSize,
            take: pageSize,
            where: {
                deletedAt: null,
            }
        });
    },

    async getAmountOfPosts(): Promise<number> {
        return prisma.post.count({
            where: {
                deletedAt: null,
            }
        });
    },

    async getPostsByCreator(creatorId: string): Promise<Post[]> {
        return prisma.post.findMany({
            where: {
                creatorId: creatorId,
                deletedAt: null,
            }
        });
    },

    async getPostsByApplicant(applicantId: string): Promise<Post[]> {
        return prisma.post.findMany({
            where: {
                applicants: {
                    some: {
                        id: applicantId,
                    }
                },
                deletedAt: null,
            }
        });
    },

    async addApplicantToPost(postId: string, applicantId: string): Promise<Post> {
        return prisma.post.update({
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
        });
    }
}