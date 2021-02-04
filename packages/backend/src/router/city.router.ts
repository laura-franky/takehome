import { Router } from 'express';
import { addCityToUser, getCitiesOfUser, deleteCityFromUser } from '../controller/city.controller';

// Router responsible for relaying every Request
export const cityRouter = Router({ mergeParams: true });

cityRouter.patch('/', addCityToUser);
cityRouter.get('/', getCitiesOfUser);
cityRouter.delete('/:cityId', deleteCityFromUser);
