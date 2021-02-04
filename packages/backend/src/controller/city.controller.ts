import { getUserId } from './user.controller';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/user';

export const addCityToUser = async (req: Request, res: Response) => {
  const { name, zipCode } = req.body;

  if (!name && !zipCode) {
    res.status(400).send({
      msg: 'missing parameter',
    });
    return;
  }
  try {
    // const cities = JSON.parse('../../data/file.json');
  } catch (error) {
    res.status(500).send(JSON.stringify(error));
  }
};

export const getCitiesOfUser = async (req: Request, res: Response) => {
  const jwt = req.get('Authorization');
  let userId = await getUserId(jwt);

  try {
    const userRepository = await getRepository(User);
    const user = await userRepository.findOneOrFail(userId!, { relations: ['cities'] });

    res.send({ data: user.cities });
  } catch (error) {
    res.status(404).send({
      msg: 'not found',
    });
  }
};

// export const getUserCitiesFromAPI = async (req: Request, res: Response) => {
//   const jwt = req.get('Authorization');
//   let userId = await getUserId(jwt);

//   try {
//     const userRepository = await getRepository(User);
//     const user = await userRepository.findOneOrFail(userId!, { relations: ['cities'] });

//     const userCities = [];

//     user.cities.map((city => (city.apiId)))

//      // getting  current weather of User Cities
//   const response = await fetch(`api.openweathermap.org/data/2.5/weather?id=${}&appid=${}`, {
//     method: 'GET',
//   });
//   const city = await response.json();

//     res.send({ data: });
//   } catch (error) {
//     res.status(404).send({
//       msg: 'not found',
//     });
//   }
// };
