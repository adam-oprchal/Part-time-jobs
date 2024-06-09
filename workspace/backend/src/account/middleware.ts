import { Request, Response, NextFunction } from "express";
declare module "express-session" {
  interface SessionData {
    passport: {
      user: { id: string };
    };
  }
}

export const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.session.passport?.user) {
    next();
  } else {
    response.status(401).send("authentication required");
  }
};
