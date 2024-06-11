import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PostApi } from './postApi';
import { Post, PostWithCreatorApplicantCount } from 'types';
import { PostSorting, createPostData } from './types';

export const usePostCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PostApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
};

export const usePostDelete = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => PostApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
};

export const usePostUpdate = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (e: createPostData) => PostApi.update(id, e),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
};

export const usePostAmount = () => {
  return useQuery<{ amount: number }>({
    queryKey: ['post', 'amount'],
    queryFn: () => PostApi.getAmountOfPosts(),
    retry: 0,
  });
};

export const usePostsByCreator = (creatorId: string) => {
  return useQuery<Post[]>({
    queryKey: ['post', 'creator', creatorId],
    queryFn: () => PostApi.getPostsByCreator(creatorId),
    retry: 0,
  });
};

export const useAppliedPosts = (userId: string) => {
  return useQuery<Post[]>({
    queryKey: ['post', 'applicant', userId],
    queryFn: () => PostApi.getAppliedPosts(),
    retry: 0,
  });
};

export const usePostApply = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => PostApi.apply(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
};

export const usePostUnapply = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => PostApi.unapply(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
};

export const usePost = (id: string) => {
  return useQuery<Post>({
    queryKey: ['post', id],
    queryFn: () => PostApi.get(id),
    retry: 0,
  });
};

export const usePosts = (
  page: number,
  pageSize: number,
  sorting: PostSorting = undefined
) => {
  return useQuery<Post[]>({
    queryKey: ['post', page, pageSize, sorting],
    queryFn: () => PostApi.getAllPaginated(page, pageSize, sorting),
    retry: 0,
  });
};

export const useAllPosts = (sorting: PostSorting = undefined) => {
  return useQuery<PostWithCreatorApplicantCount[]>({
    queryKey: ['post', sorting],
    queryFn: () => PostApi.getPosts(sorting),
    retry: 0,
  });
};
