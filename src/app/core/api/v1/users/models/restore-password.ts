/* tslint:disable */
/* eslint-disable */
import { Otp } from '../models/otp';
import { OtpCode } from '../models/otp-code';
export type RestorePassword = OtpCode & {
'otp': Otp;
'password': string;
};
