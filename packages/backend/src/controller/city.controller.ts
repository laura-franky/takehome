import { getUserId } from './user.controller';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/user';
import { City } from '../entities/city';

export const addCityToUser = async (req: Request, res: Response) => {
  const { name, zipCode } = req.body;
  const jwt = req.get('Authorization');
  let userId = await getUserId(jwt);

  if (!name && !zipCode) {
    res.status(400).send({
      msg: 'missing parameter',
    });
    return;
  }
  try {
    // const response = await fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=`,
    //   {
    //     method: 'GET',
    //   },
    // );
    // const city = await response.json();
    //

    const userRepository = await getRepository(User);
    const user = await userRepository.findOneOrFail(userId!);

    let city = new City();
    city.users.push(user);

    res.send(city);
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

export const getUserCitiesFromAPI = async (req: Request, res: Response) => {
  const jwt = req.get('Authorization');
  let userId = await getUserId(jwt);

  try {
    const userRepository = await getRepository(User);
    const user = await userRepository.findOneOrFail(userId!, { relations: ['cities'] });

    // getting  current weather of User Cities
    // `api.openweathermap.org/data/2.5/weather?id=${city.apiId}&appid=`,

    res.send({ data: user });
  } catch (error) {
    res.status(404).send({
      msg: 'not found',
    });
  }
};

export const deleteCityFromUser = async (req: Request, res: Response) => {
  const cityId = req.params.cityId;

  try {
    const cityRepository = await getRepository(City);
    const city = await cityRepository.findOneOrFail(cityId);

    await cityRepository.remove(city);
    res.status(200).send('deleted successfully');
  } catch (error) {
    res.status(404).send(JSON.stringify(error));
  }
};
