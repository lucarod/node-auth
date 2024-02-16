import { ZodError, z } from 'zod';

import { AccountAlreadyExistsError } from '@app/errors/AccountAlreadyExistsError';
import { IController, IRequest, IResponse } from '@app/interfaces/IController';
import { SignUpUseCase } from '@app/useCases/SignUpUseCase';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, name, password } = schema.parse(body);

      await this.signUpUseCase.execute({ email, name, password });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof AccountAlreadyExistsError) {
        return {
          statusCode: 409,
          body: { error: 'This email is already in use' },
        };
      }

      throw error;
    }
  }
}
