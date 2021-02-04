// import { Authentication } from './../middleware/authentication';
import { userRouter } from './user.router';
import { cityRouter } from './city.router';
import { Request, Response, Router } from 'express';

// Router responsible for relaying every Request
export const globalRouter = Router({ mergeParams: true });

// Basic get
globalRouter.get('/', async (_: Request, res: Response) => {
  res.send({
    message: 'Weather App',
  });
});

globalRouter.use('/city', cityRouter);
globalRouter.use('/user', userRouter);
