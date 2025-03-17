import { HttpStatusCode } from 'axios';
import { CustomError } from 'ts-custom-error';

enum ClientClosedRequestCode {
  ClientClosedRequest = 499,
}

export type HttpCode = HttpStatusCode | ClientClosedRequestCode;

export const HttpCode = { ...HttpStatusCode, ...ClientClosedRequestCode };

export class HttpError extends CustomError {
  constructor(
    public status: number,
    public data: unknown,
    public innerError: Error,
    message?: string,
  ) {
    super(message);
  }
}

export function isHttpError(
  error: unknown,
  httpCode: HttpCode,
): error is HttpError {
  return error instanceof HttpError && error.status === httpCode;
}

export class CancelledRequestError extends HttpError {
  constructor(
    url: string,
    method: string,
    public innerError: Error,
  ) {
    super(
      HttpCode.ClientClosedRequest,
      undefined,
      innerError,
      `HTTP request has been cancelled: ${method} ${url}`,
    );
  }
}

export function isCancelledRequestError(
  error: unknown,
): error is CancelledRequestError {
  return error instanceof CancelledRequestError;
}
