/* tslint:disable */
/* eslint-disable */
import { Base } from '../models/base';
import { UserForm } from '../models/user-form';
import { VerificationStatus } from '../models/verification-status';
export type UserVerification = Base & {
'user': UserForm;
'verificationSession': ({
'url': string;
'status': VerificationStatus;
}) | null;
};
