import { hash } from 'bcryptjs';

import { AccountAlreadyExistsError } from '@app/errors/AccountAlreadyExistsError';
import { prismaClient } from '@app/libs/prismaClient';

interface IInput {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;

export class SignUpUseCase{
  constructor(private readonly salt: number) {}

  async execute({ email, name, password }: IInput): Promise<IOutput> {
    const accountAlreadyExists = await prismaClient.account.findUnique({
      where: { email },
    });

    if (accountAlreadyExists) {
      throw new AccountAlreadyExistsError();
    }

    const hashedPassword = await hash(password, this.salt);

    await prismaClient.account.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
  }
}
