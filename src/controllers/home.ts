import { Request, Response } from 'express';

export const home = (req: Request, res: Response) => {
  res.json({
    hello: 'world!',
  });
};

export const foo = (req: Request, res: Response) => {
  res.json({
    bar: 'baz',
  });
};
