import { Request, Response, NextFunction } from "express";
declare module "express-session" {
  interface SessionData {
    passport: {
      user: { id: string };
    };
  }
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.passport?.user) {
    next();
  } else {
    res.status(401).send("authentication required");
  }
};
