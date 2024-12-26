import { SVGProps } from 'react';

export type TLocales = 'en' | 'ja';

export type TTranslation = {
  [key: string]: unknown;
};

export interface TApiResponse {
  statusCode: number;
  data: unknown;
  errorMessage?: string | null;
  errorCode?: string | null;
  timestamp?: string | null;
}

export type Props<TParams = { lang: TLocales }, TSearchParams = Record<string, never>> = {
  params: TParams & { lang: TLocales };
  searchParams?: TSearchParams;
};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
