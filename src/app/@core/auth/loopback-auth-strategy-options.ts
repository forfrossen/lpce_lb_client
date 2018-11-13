/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NbAuthSimpleToken, NbAuthTokenClass } from '@nebular/auth/services/';
import { NbAuthStrategyOptions } from '@nebular/auth/strategies';
import { getDeepFromObject } from '@nebular/auth/helpers';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

export interface LoopbackAuthStrategyModule {
  alwaysFail?: boolean;
  endpoint?: string;
  method?: string;
  redirect?: {
    success?: string | null;
    failure?: string | null;
  };
  requireValidToken?: boolean;
  defaultErrors?: string[];
  defaultMessages?: string[];
}

export interface LoopbackAuthStrategyReset extends LoopbackAuthStrategyModule {
  resetPasswordTokenKey?: string;
}

export interface LoopbackAuthStrategyToken {
  class?: NbAuthTokenClass,
  key?: string,
  getter?: Function,
}

export interface LoopbackAuthStrategyMessage {
  key?: string,
  getter?: Function,
}

export class LoopbackAuthStrategyOptions extends NbAuthStrategyOptions {
  baseEndpoint? = '/api/auth/';
  login?: boolean | LoopbackAuthStrategyModule = {
    alwaysFail: false,
    endpoint: 'login',
    method: 'post',
    requireValidToken: false,
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Login/Email combination is not correct, please try again.'],
    defaultMessages: ['You have been successfully logged in.'],
  };
  register?: boolean | LoopbackAuthStrategyModule = {
    alwaysFail: false,
    endpoint: 'register',
    method: 'post',
    requireValidToken: false,
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['You have been successfully registered.'],
  };
  requestPass?: boolean | LoopbackAuthStrategyModule = {
    endpoint: 'request-pass',
    method: 'post',
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['Reset password instructions have been sent to your email.'],
  };
  resetPass?: boolean | LoopbackAuthStrategyReset = {
    endpoint: 'reset-pass',
    method: 'put',
    redirect: {
      success: '/',
      failure: null,
    },
    resetPasswordTokenKey: 'reset_password_token',
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['Your password has been successfully changed.'],
  };
  logout?: boolean | LoopbackAuthStrategyReset = {
    alwaysFail: false,
    endpoint: 'logout',
    method: 'delete',
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['You have been successfully logged out.'],
  };
  refreshToken?: boolean | LoopbackAuthStrategyModule = {
    endpoint: 'refresh-token',
    method: 'post',
    requireValidToken: false,
    redirect: {
      success: null,
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['Your token has been successfully refreshed.'],
  };
  token?: LoopbackAuthStrategyToken = {
    class: NbAuthSimpleToken,
    key: 'data.token',
    getter: (module: string, res: HttpResponse<Object>, options: LoopbackAuthStrategyOptions) => getDeepFromObject(
      res.body,
      options.token.key,
    ),
  };
  errors?: LoopbackAuthStrategyMessage = {
    key: 'data.errors',
    getter: (module: string, res: HttpErrorResponse, options: LoopbackAuthStrategyOptions) => getDeepFromObject(
      res.error,
      options.errors.key,
      options[module].defaultErrors,
    ),
  };
  messages?: LoopbackAuthStrategyMessage = {
    key: 'data.messages',
    getter: (module: string, res: HttpResponse<Object>, options: LoopbackAuthStrategyOptions) => getDeepFromObject(
      res.body,
      options.messages.key,
      options[module].defaultMessages,
    ),
  };
  validation?: {
    password?: {
      required?: boolean;
      minLength?: number | null;
      maxLength?: number | null;
      regexp?: string | null;
    };
    email?: {
      required?: boolean;
      regexp?: string | null;
    };
    fullName?: {
      required?: boolean;
      minLength?: number | null;
      maxLength?: number | null;
      regexp?: string | null;
    };
  };
}