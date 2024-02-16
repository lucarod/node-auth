import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { env } from '@app/config/env';
import { InvalidCredentialsError } from '@app/errors/InvalidCredentialsError';
import { prismaClient } from '@app/libs/prismaClient';

interface IInput {
  email: string;
  password: string;
}

interface IOutput {
  accessToken: string;
}

export class SignInUseCase{
  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await prismaClient.account.findUnique({
      where: { email },
    });

    if (!account) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await compare(password, account.password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const accessToken = sign(
      { data: account.id },
      env.jwtSecret,
      { expiresIn: '1d' }
    );

    return { accessToken };
  }
}
