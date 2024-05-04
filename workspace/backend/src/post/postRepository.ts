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
            }
        });
    },

    async getPostsPaginated(page: number, pageSize: number): Promise<Post[]> {
        return prisma.post.findMany({
            skip: page * pageSize,
            take: pageSize,
        });
    },

    async getAmountOfPosts(): Promise<number> {
        return prisma.post.count();
    },

    async getPostsByCreator(creatorId: string): Promise<Post[]> {
        return prisma.post.findMany({
            where: {
                creatorId: creatorId,
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