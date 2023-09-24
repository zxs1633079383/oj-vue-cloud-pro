/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudeInfo } from './JudeInfo';
import type { QuestionVO } from './QuestionVO';
import type { UserVO } from './UserVO';

export type QuestionSubmitVO = {
    code?: string;
    createTime?: string;
    id?: number;
    judeInfo?: JudeInfo;
    language?: string;
    questionId?: number;
    questionVO?: QuestionVO;
    status?: number;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
};
