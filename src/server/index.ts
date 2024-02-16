import express from 'express';

import { router } from '@server/routes';

export const app = express();

app.use(express.json());
app.use(router);

app.listen(3001, () => {
  console.log('🔥 Server started at http://localhost:3001');
});
