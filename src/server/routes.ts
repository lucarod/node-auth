import { Router } from 'express';

import { SignInController } from '@app/controllers/SignInController';
import { SignUpController } from '@app/controllers/SignUpController';
import { SignInUseCase } from '@app/useCases/SignInUseCase';
import { SignUpUseCase } from '@app/useCases/SignUpUseCase';

const router = Router();

router.post('/signup', async (request, response) => {
  const SALT = 10;
  const signUpUseCase = new SignUpUseCase(SALT);
  const signUpController = new SignUpController(signUpUseCase);

  const { statusCode, body } = await signUpController.handle({
    body: request.body,
  });

  response.status(statusCode).json(body);
});

router.post('/signin', async (request, response) => {
  const signInUseCase = new SignInUseCase();
  const signInController = new SignInController(signInUseCase);

  const { statusCode, body } = await signInController.handle({
    body: request.body,
  });

  response.status(statusCode).json(body);
});

export { router };
