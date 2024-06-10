export type registerData = {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type createPostData = {
  jobName: string;
  description: string;
  wage: number;
  location: string;
  expectedHours: number;
};

export type PostSorting =
  | undefined
  | { jobName: 'asc' | 'desc' }
  | { location: 'asc' | 'desc' }
  | { wage: 'asc' | 'desc' };
