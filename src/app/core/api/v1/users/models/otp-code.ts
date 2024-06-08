/* tslint:disable */
/* eslint-disable */
import { GrantType } from '../models/grant-type';
export interface OtpCode {
  grant_type: GrantType;
  sendTo: string;
}
