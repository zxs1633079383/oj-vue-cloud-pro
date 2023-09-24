/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudeCase } from './JudeCase';
import type { JudeConfig } from './JudeConfig';

export type QuestionUpdateRequest = {
    answer?: string;
    content?: string;
    id?: number;
    judeCase?: Array<JudeCase>;
    judeConfig?: JudeConfig;
    tags?: Array<string>;
    title?: string;
};
