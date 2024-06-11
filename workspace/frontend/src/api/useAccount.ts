import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AccountApi } from './accountApi';
import { AccountWithCvWithoutPassword, AccountWithoutPassword } from 'types';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AccountApi.logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
};

export const useApplicantsByPost = (postId: string) => {
  return useQuery<AccountWithCvWithoutPassword[]>({
    queryKey: ['account', 'byPost', postId],
    queryFn: () => AccountApi.getApplicantsByPost(postId),
    retry: 0,
  });
};

export const useApplicantByAccount = (creatorId: string) => {
  return useQuery<Map<string, AccountWithoutPassword[]>>({
    queryKey: ['account', 'byCreator', creatorId],
    queryFn: () => AccountApi.getApplicantsByAccount(),
    retry: 0,
  });
};

export const useAccountDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AccountApi.deleteAccount(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
  });
};
