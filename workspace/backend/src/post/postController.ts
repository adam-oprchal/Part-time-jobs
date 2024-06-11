import { postRepository } from './postRepository';
import { Request, Response } from 'express';
import { paginationSchema, postSchema, postSortingSchema } from './schema';

export const postController = {
  createPost: async (request: Request, response: Response) => {
    const parseResult = await postSchema.safeParseAsync(request.body);
    if (!parseResult.success) {
      response.status(400).send(parseResult.error);
      return;
    }

    const post = {
      creatorId: request.session.passport.user.id,
      ...request.body,
    };

    const result = await postRepository.createPost(post);

    if (result.isOk) {
      response.send(result.value);
    } else {
      response.status(400).send('Bad request');
    }
  },

  deletePost: async (request: Request, response: Response) => {
    const post = await postRepository.getPost(request.params.id);
    if (post.isErr) {
      response.status(400).send('Bad request');
    } else if (post.isOk) {
      if (post.value.creatorId != request.session.passport.user.id) {
        response.status(403).send('unauthorized');
        return;
      }

      const result = await postRepository.deletePost(request.params.id);

      if (result.isOk) {
        response.send(result.value);
      } else {
        response.status(400).send('Bad request');
      }
    }
  },

  updatePost: async (request: Request, response: Response) => {
    const parseResult = await postSchema.safeParseAsync(request.body);
    if (!parseResult.success) {
      response.status(400).send(parseResult.error);
      return;
    }

    const originalPost = await postRepository.getPost(request.params.id);
    if (originalPost.isErr) {
      response.status(400).send('Bad request');
    } else if (originalPost.isOk) {
      if (originalPost.value.creatorId != request.session.passport.user.id) {
        response.status(403).send('unauthorized');
        return;
      }

      const post = {
        creatorId: request.session.passport.user.id,
        ...request.body,
      };

      const result = await postRepository.updatePost(request.params.id, post);

      if (result.isOk) {
        response.send(result.value);
      } else {
        response.status(400).send('Bad request');
      }
    }
  },

  getPost: async (request: Request, response: Response) => {
    const result = await postRepository.getPost(request.params.id);

    if (result.isOk) {
      response.send(result.value);
    } else {
      response.status(400).send('Bad request');
    }
  },

  getPostsPaginated: async (request: Request, response: Response) => {
    const validRequest = await paginationSchema.safeParseAsync(request);
    if (!validRequest.success) {
      response.status(400).send('Bad request');
      return;
    }

    const { page, pageSize } = validRequest.data.query;

    const sortingRequest = await postSortingSchema.safeParseAsync(request);
    if (!sortingRequest.success) {
      response.status(400).send('Bad request');
      return;
    }

    const { sorting } = sortingRequest.data.query;

    const result = await postRepository.getPostsPaginated(
      page,
      pageSize,
      sorting
    );

    if (result.isOk) {
      response.send(result.value);
    } else {
      response.status(400).send('Bad request');
    }
  },

  getPosts: async (request: Request, response: Response) => {
    const validRequest = await postSortingSchema.safeParseAsync(request);
    if (!validRequest.success) {
      response.status(400).send('Bad request');
      return;
    }

    const { sorting } = validRequest.data.query;
    const result = await postRepository.getPosts(request.session.passport.user.id, sorting);

    if (result.isOk) {
      response.send(result.value);
    } else {
      response.status(400).send('Bad request');
    }
  },

  getAmountOfPosts: async (request: Request, response: Response) => {
    const result = await postRepository.getAmountOfPosts();

    if (result.isOk) {
      response.send({ amount: result.value });
    } else {
      response.status(400).send('Bad request');
    }
  },

  getPostsByCreator: async (request: Request, response: Response) => {
    const result = await postRepository.getPostsByCreator(
      request.params.creatorId
    );

    if (result.isOk) {
      response.send(result.value);
    } else {
      response.status(400).send('Bad request');
    }
  },

  getPostsByApplicant: async (request: Request, response: Response) => {
    const result = await postRepository.getPostsByApplicant(
      request.session.passport.user.id
    );

    if (result.isOk) {
      response.send(result.value);
    } else {
      response.status(400).send('Bad request');
    }
  },

  applyForPost: async (request: Request, response: Response) => {
    const result = await postRepository.addApplicantToPost(
      request.params.postId,
      request.session.passport.user.id
    );

    if (result.isOk) {
      response.send(result.value);
    } else {
      response.status(400).send('Bad request');
    }
  },

  unapplyFromPost: async (request: Request, response: Response) => {
    const result = await postRepository.removeApplicantFromPost(
      request.params.postId,
      request.session.passport.user.id
    );

    if (result.isOk) {
      response.send(result.value);
    } else {
      response.status(400).send('Bad request');
    }
  },
};
