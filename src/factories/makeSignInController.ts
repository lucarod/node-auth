import { makeSignInUseCase } from '@factories/makeSignInUseCase';

import { SignInController } from '@app/controllers/SignInController';

export function makeSignInController() {
  const signInUseCase = makeSignInUseCase();
  return new SignInController(signInUseCase);
}
