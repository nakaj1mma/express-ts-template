import { NextFunction, Request, Response } from "express";

const catchAsync = (fn: Function): Function => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
