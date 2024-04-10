import prisma  from "../db/client";
import {Post} from "types";

export const postRepository = {

    async createPost(data: Post): Promise<Post> {
        return prisma.post.create({
            data: data,
        });
    }

}