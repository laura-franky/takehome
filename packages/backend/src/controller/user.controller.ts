import { Authentication } from './../middleware/authentication';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/user';

export const registerUser = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    const userRepository = await getRepository(User);

    // Check if user exists
    const user = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (user) {
      res.status(400).send({
        status: 'bad_request',
      });
      return;
    } else {
      const newUser = new User();
      newUser.email = email;
      newUser.username = username;

      if (password) {
        // Generate hashed password
        const hashedPassword: string = await Authentication.hashPassword(password);
        newUser.password = hashedPassword;
      } else throw 'no_password';

      const createdUser = await userRepository.save(newUser);

      const token: string = await Authentication.generateToken({
        email: createdUser.email,
        id: createdUser.id,
        name: createdUser.username,
      });

      res.send({
        data: { createdUser, token },
      });
      return;
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// logs a user in
export const loginUser = async (req: Request, res: Response) => {
  const { username: name, password } = req.body;

  try {
    const userRepository = await getRepository(User);
    // Check if user exists
    const user = await userRepository.findOne({
      select: ['password', 'email', 'username', 'id'],
      where: {
        username: name,
      },
    });

    if (!user) {
      return res.status(404).send({ message: `Could not find user '${name}'` });
    }

    const matchingPasswords: boolean = await Authentication.comparePasswordWithHash(password, user.password);
    if (!matchingPasswords) {
      return res.status(401).send({ status: 'unauthorized' });
    }
    {
      const token: string = await Authentication.generateToken({
        email: user.email,
        id: user.id,
        name: user.username,
      });

      return res.status(200).send({
        data: token,
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// getting User Id out of the Authorization Token
export const getUserId = async (jwt: any) => {
  const validToken = await Authentication.verifyToken(jwt);
  if (validToken) {
    const stringToken = JSON.stringify(validToken).split('"');
    // magic number 2 because of position in stringified JSON
    return stringToken[stringToken.indexOf('id') + 2];
  }
  return null;
};
