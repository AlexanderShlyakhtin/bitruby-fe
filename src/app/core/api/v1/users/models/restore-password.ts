/* tslint:disable */
/* eslint-disable */
import {Id} from '../models/id';
import {Otp} from '../models/otp';

export type RestorePassword = {
'otp': Otp;
'password': string;
'restorePasswordId': Id;
};
