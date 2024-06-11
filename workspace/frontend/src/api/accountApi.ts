import axiosInstance from '.';
import { registerData } from './types';
import { Account, AccountRegisterWithoutPassword, AccountWithCvWithoutPassword, AccountWithoutPassword, Cv, CvUp, CvUpdate } from 'types';

async function register(data: registerData) {
  const resp = await axiosInstance.post<AccountWithoutPassword>(
    'account/register',
    data
  );
  return resp.data;
}

async function updateAccount(data: AccountRegisterWithoutPassword) {
  const resp = await axiosInstance.put<AccountRegisterWithoutPassword>(
    'account/update',
    data
  );
  return resp.data;
}

async function login(email: string, password: string) {
  try {
    const resp = await axiosInstance.post<boolean>('account/login', {
      email,
      password,
    });
    return resp.data;
  } catch(error) {
    return false;
  }
}

async function logout() {
  const resp = await axiosInstance.get<void>('account/logout');
  return resp.data;
}

async function getUserAccount() {
    const resp = await axiosInstance.get<AccountWithoutPassword>(
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

async function changePassword(oldPassword: string, newPassword: string, newPasswordConfirm: string) {
  const resp = await axiosInstance.put<boolean>('account/change-password', {
    oldPassword,
    newPassword,
    newPasswordConfirm,
  });
  return resp.data;
}

async function deleteAccount() {
  const resp = await axiosInstance.delete<void>('account/');
  return resp.data;
}

async function uploadCv(cvData: CvUp) {
  try {
    const resp = await axiosInstance.post<Cv>('account/cv', {...cvData} );
    return resp.data;
  } catch(error) {
    console.error(error);
  }
}

async function downloadCv() {
  try {
    const resp = await axiosInstance.get<CvUpdate>('account/cv');
    return resp.data;
  } catch(error) {
    console.error(error);
  }
}

async function downloadForeignCv(accountId: string) {
  const resp = await axiosInstance.get<CvUpdate>(`account/cv/${accountId}`);
  return resp.data;
}

async function deleteCv() {
  const resp = await axiosInstance.delete<void>('account/cv');
  return resp.data;
}

export const AccountApi = {
  register,
  login,
  logout,
  getUserAccount,
  getApplicantsByPost,
  getApplicantsByAccount,
  changePassword,
  updateAccount,
  deleteAccount,
  uploadCv,
  downloadCv,
  downloadForeignCv,
  deleteCv,
};
