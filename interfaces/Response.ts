export interface SuccessResponse {
  status: 'ok';
  message: string;
}

export interface ErrorResponse {
  status: 'error';
  message: string;
}

export type DefaultResponse = SuccessResponse | ErrorResponse;
