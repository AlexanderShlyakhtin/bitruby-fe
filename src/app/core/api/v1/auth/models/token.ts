/* tslint:disable */
/* eslint-disable */
export interface Token {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;

  [key: string]: any;
}
