import { Router } from 'express';
import { addCityToUser } from '../controller/city.controller';

// Router responsible for relaying every Request
export const cityRouter = Router({ mergeParams: true });

cityRouter.get('/', addCityToUser);
