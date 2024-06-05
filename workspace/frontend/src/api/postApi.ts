import { Post } from 'types';
import { axiosInstance } from '.';
import { createPostData } from './types';

async function create(data: createPostData) {
  const resp = await axiosInstance.post<Post>('post/', data);
  return resp.data;
}

async function deletePost(id: string) {
  const resp = await axiosInstance.delete<Post>(`post/${id}`);
  return resp.data;
}

async function update(id: string, data: createPostData) {
  const resp = await axiosInstance.put<Post>(`post/${id}`, data);
  return resp.data;
}

async function getAmountOfPosts() {
  const resp = await axiosInstance.get<{ amount: number }>('post/amount');
  return resp.data;
}

async function getPostsByCreator(creatorId: string) {
  const resp = await axiosInstance.get<Post[]>(`post/by-creator/${creatorId}`);
  return resp.data;
}

async function getPostsByApplicant(applicantId: string) {
  const resp = await axiosInstance.get<Post[]>(
    `post/by-applicant/${applicantId}`
  );
  return resp.data;
}

async function apply(postId: string, applicantId: string) {
  const resp = await axiosInstance.post<Post>(
    `post/apply/${postId}/${applicantId}`
  );
  return resp.data;
}

async function get(id: string) {
  const resp = await axiosInstance.get<Post>(`post/${id}`);
  return resp.data;
}

async function getAllPaginated(page: number, pageSize: number) {
  const resp = await axiosInstance.get<Post[]>('post/', {
    params: { page, pageSize },
  });
  return resp.data;
}

export const PostApi = {
  create,
  deletePost,
  update,
  getAmountOfPosts,
  getPostsByCreator,
  getPostsByApplicant,
  apply,
  get,
  getAllPaginated,
};
