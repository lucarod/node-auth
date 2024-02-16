import { JwtPayload, verify } from 'jsonwebtoken';

import { env } from '@app/config/env';
import { IData, IMiddleware, IRequest, IResponse } from '@app/interfaces/IMiddleware';

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    const { authorization } = headers;
    if (!authorization) {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token',
        },
      };
    }

    try {
      const [authType, token] = authorization.split(' ');

      if (authType !== 'Bearer') {
        throw new Error();
      }

      const payload: JwtPayload = verify(token, env.jwtSecret) as JwtPayload;

      return {
        data: {
          accountId: payload.data,
        },
      };
    } catch {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token',
        },
      };
    }
  }
}
