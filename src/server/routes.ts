import { Router } from 'express';

import { SignUpController } from '@app/controllers/SignUpController';
import { SignUpUseCase } from '@app/useCases/SignUpUseCase';

const router = Router();

router.get('/signup', async (request, response) => {
  const SALT = 10;
  const signUpUseCase = new SignUpUseCase(SALT);
  const signUpController = new SignUpController(signUpUseCase);

  const { statusCode, body } = await signUpController.handle({
    body: request.body,
  });

  response.status(statusCode).json(body);
});

router.get('/signin', (request, response) => {
  response.status(200).json({
    message: 'signin',
  });
});

export { router };
