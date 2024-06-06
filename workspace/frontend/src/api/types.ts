export type registerData = {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  passwordAgain: string;
};

export type createPostData = {
  description: string;
  wage: number;
  location: string;
  expectedHours: number;
  creatorId: string;
};
