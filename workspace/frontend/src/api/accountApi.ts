import { axiosInstance } from '.';
import { registerData } from './types';

export async function register(data: registerData) {
  const resp = await axiosInstance.post("/registration");
}

export async function getById(id: string) {
  const resp = await axiosInstance.get(`/by-id/${id}`);
}

export async function getByEmail(email: string) {
  const resp = await axiosInstance.get(`/by-email/${email}`);
}

export async function getApplicantsByPost(postId: string) {
  const resp = await axiosInstance.get(`/applicants-by-post/${postId}`);
}

export async function getApplicantsByPostCreator(id: string) {
  const resp = await axiosInstance.get(`/applicants-by-account/${id}`);
}

export async function deleteById(id: string) {
  const resp = await axiosInstance.delete(`/${id}`);
}
