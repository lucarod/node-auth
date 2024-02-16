import { Router } from 'express';

import { makeSignInController } from '@factories/makeSignInController';
import { makeSignUpController } from '@factories/makeSignUpController';

import { routeAdapter } from '@server/adapters/routeAdapter';

const router = Router();

router.post('/signup', routeAdapter(makeSignUpController()));
router.post('/signin', routeAdapter(makeSignInController()));

export { router };
