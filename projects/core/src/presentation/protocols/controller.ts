import { HttpResponse } from './http';

export interface Controller<R> {
  handle: (request: any) => Promise<HttpResponse<R>>;
}
