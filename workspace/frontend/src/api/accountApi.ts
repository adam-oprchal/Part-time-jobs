import { axiosInstance } from '.';
import { registerData } from './types';
import { Account, AccountWithCvWithoutPassword, Cv } from 'types';

export async function register(data: registerData) {
  const resp = await axiosInstance.post<AccountWithCvWithoutPassword>(
    'account/registration',
    data
  );
  return resp.data;
}

export async function getById(id: string) {
  const resp = await axiosInstance.get<AccountWithCvWithoutPassword>(
    `account/by-id/${id}`
  );
  return resp.data;
}

export async function getByEmail(email: string) {
  const resp = await axiosInstance.get<AccountWithCvWithoutPassword>(
    `account/by-email/${email}`
  );
  return resp.data;
}

export async function getApplicantsByPost(postId: string) {
  const resp = await axiosInstance.get<AccountWithCvWithoutPassword[]>(
    `account/applicants-by-post/${postId}`
  );
  return resp.data;
}

export async function getApplicantsByPostCreator(id: string) {
  const resp = await axiosInstance.get<
    Map<string, Omit<Account, 'passwordHash'>[]>
  >(`account/applicants-by-account/${id}`);
  return resp.data;
}

export async function deleteById(id: string) {
  const resp = await axiosInstance.delete<void>(`account/${id}`);
  return resp.data;
}

export async function uploadCv(fileName: string, accountId: string) {
  const resp = await axiosInstance.put<Cv>(`account/cv`, {
    fileName,
    accountId,
  });
  return resp.data;
}
