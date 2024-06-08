import { axiosInstance } from '.';
import { registerData } from './types';
import { Account, AccountWithCvWithoutPassword, Cv } from 'types';

async function register(data: registerData) {
  const resp = await axiosInstance.post<AccountWithCvWithoutPassword>(
    'account/registration',
    data
  );
  return resp.data;
}

async function login(email: string, password: string) {
  const resp = await axiosInstance.post<void>('account/login', {
    email,
    password,
  });
  return resp.data;
}

async function logout() {
  const resp = await axiosInstance.get<void>('account/logout');
  return resp.data;
}

async function getUserAccount() {
  const resp = await axiosInstance.get<AccountWithCvWithoutPassword>(
    'account/'
  );
  return resp.data;
}

async function getApplicantsByPost(postId: string) {
  const resp = await axiosInstance.get<AccountWithCvWithoutPassword[]>(
    `account/applicants-by-post/${postId}`
  );
  return resp.data;
}

async function getApplicantsByAccount() {
  const resp = await axiosInstance.get<
    Map<string, Omit<Account, 'passwordHash'>[]>
  >('account/applicants-by-account');
  return resp.data;
}

async function deleteAccount() {
  const resp = await axiosInstance.delete<void>('account/');
  return resp.data;
}

export const AccountApi = {
  register,
  login,
  logout,
  getUserAccount,
  getApplicantsByPost,
  getApplicantsByAccount,
  deleteAccount,
};
