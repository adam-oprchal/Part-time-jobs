import { Request, Response, NextFunction } from "express";
declare module "express-session" {
  interface SessionData {
    passport: {
      user: { username: string; id: string };
    };
  }
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.session);

  if (req.session.passport?.user) next();
  else res.status(401).send("authentication required");
};
