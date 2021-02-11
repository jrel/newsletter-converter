import { NextApiRequest, NextApiResponse } from 'next';
import { Controller, MongoHelper } from '@newsletter-converter/core';
import env from '../../src/config/env';

export function adaptNextJsApi<R>(controller: Controller<R>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    MongoHelper.uri =(env.MONGO_URI);
    const response = await controller.handle(req.body);

    res.status(response.statusCode).json(response.body);
  };
}
