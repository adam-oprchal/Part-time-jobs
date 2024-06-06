import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AccountApi } from './accountApi';
import { Account, AccountWithCvWithoutPassword } from 'types';

export const useAccountRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AccountApi.register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
  });
};

export const useAccountById = (id: string) => {
  return useQuery<AccountWithCvWithoutPassword>({
    queryKey: ['account', id],
    queryFn: () => AccountApi.getById(id),
  });
};

export const useAccountByEmail = (email: string) => {
  return useQuery<AccountWithCvWithoutPassword>({
    queryKey: ['account', email],
    queryFn: () => AccountApi.getByEmail(email),
  });
};

export const useApplicantsByPost = (postId: string) => {
  return useQuery<AccountWithCvWithoutPassword[]>({
    queryKey: ['account', 'byPost', postId],
    queryFn: () => AccountApi.getApplicantsByPost(postId),
  });
};

export const useApplicantByPostCreator = (creatorId: string) => {
  return useQuery<Map<string, Omit<Account, 'passwordHash'>[]>>({
    queryKey: ['account', 'byCreator', creatorId],
    queryFn: () => AccountApi.getApplicantsByPostCreator(creatorId),
  });
};

export const useAccountDelete = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AccountApi.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
  });
};

export const useUploadCv = (fileName: string, accountId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AccountApi.uploadCv(fileName, accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
  });
};
