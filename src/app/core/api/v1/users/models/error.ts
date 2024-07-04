/* tslint:disable */
/* eslint-disable */
import {Base} from '../models/base';

export type Error = Base & {

/**
 * code of error
 */
'code': string;

/**
 * code of error
 */
'message': string;
'payload': Array<string>;
};
