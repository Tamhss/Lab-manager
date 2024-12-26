type RepicleEnv = 'prod' | 'stg' | 'qa' | 'dev' | 'dev2' | 'local' | 'test' | 'autify';

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_API_BASE_URL: string;
    readonly NEXT_PUBLIC_CSRF_TOKEN_COOKIE_NAME: string;
    readonly NEXT_PUBLIC_REPICLE_ENV: RepicleEnv;
    readonly CSRF_TOKEN_API_URL: string;
    readonly NEXT_PUBLIC_COOKIE_DOMAIN: string;
  }
}
