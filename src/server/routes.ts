import { Router } from 'express';

import { routeAdapter } from '@server/adapters/routeAdapter';

import { makeAuthenticationMiddleware } from '@factories/makeAuthenticationMiddleware';
import { makeListLeadsController } from '@factories/makeListLeadsController';
import { makeSignInController } from '@factories/makeSignInController';
import { makeSignUpController } from '@factories/makeSignUpController';

import { middlewareAdapter } from './adapters/middlewareAdapter';

const router = Router();

router.post('/signup', routeAdapter(makeSignUpController()));
router.post('/signin', routeAdapter(makeSignInController()));

router.get('/leads',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeListLeadsController())
);

export { router };
