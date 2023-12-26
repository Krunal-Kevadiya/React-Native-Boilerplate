import { ApiError } from 'aws-amplify/api';
import { PROBLEM_CODE } from '../CommonTypes';

/**
 * Type of method to support api call
 */
export type AwsMethod =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'del'
  | 'DEL'
  | 'head'
  | 'HEAD';

type DocumentType =
  | null
  | boolean
  | number
  | string
  | DocumentType[]
  | {
      [prop: string]: DocumentType;
    };

type ResponsePayload = {
  blob(): Promise<Blob>;
  json(): Promise<DocumentType>;
  text(): Promise<string>;
};

export type Headers = Record<string, string>;

export type RestApiResponse = {
  body: ResponsePayload;
  statusCode: number;
  headers: Headers;
};

export type Operation<Response> = {
  response: Promise<Response>;
  cancel(abortMessage?: string): void;
};

/**
 * @deprecated
 */
type AWSAuthSignInDetails = {
  loginId?: string;
  authFlowType?: AuthFlowType;
};

/**
 * @deprecated
 */
type AuthFlowType =
  | 'USER_SRP_AUTH'
  | 'CUSTOM_WITH_SRP'
  | 'CUSTOM_WITHOUT_SRP'
  | 'USER_PASSWORD_AUTH';

type JwtPayloadStandardFields = {
  exp?: number;
  iss?: string;
  aud?: string | string[];
  nbf?: number;
  iat?: number;
  scope?: string;
  jti?: string;
  sub?: string;
};
type JsonPrimitive = null | string | number | boolean;
/** JSON array type */
type JsonArray = JsonPrimitive[];
/** JSON Object type */
type JsonObject = {
  [x: string]: JsonPrimitive | JsonArray | JsonObject;
};
type JwtPayload = JwtPayloadStandardFields & JsonObject;
type JWT = {
  payload: JwtPayload;
  toString(): string;
};

type AuthTokens = {
  idToken?: JWT;
  accessToken: JWT;
  /**
   * @deprecated
   * Use getCurrentUser to access signInDetails
   */
  signInDetails?: AWSAuthSignInDetails;
};

type AWSCredentials = {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
  expiration?: Date;
};

export type AuthSession = {
  tokens?: AuthTokens;
  credentials?: AWSCredentials;
  identityId?: string;
  userSub?: string;
};

export type ApiErrorsResponse = {
  statusCode: number;
  headers: Record<string, string>;
  body?: string;
};

export type BaseApiResponse<T> = {
  problem: PROBLEM_CODE | null;
  originalError?: ApiError | null;
  originalResponse?: RestApiResponse | null;

  data?: T;
  status?: number;
  headers?:
    | Headers
    | Partial<
        Record<string, string> & {
          'set-cookie'?: string[] | undefined;
        }
      >;
  config?: never;
  duration?: number;
};

export type ApiErrorResponse<T> = {
  ok: false;
} & BaseApiResponse<T>;

export type ApiOkResponse<T> = {
  ok: true;
} & BaseApiResponse<T>;

export type ApiAwsResponse<T, U = T> = ApiErrorResponse<U> | ApiOkResponse<T>;
