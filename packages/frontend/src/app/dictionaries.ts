// import { match } from '@formatjs/intl-localematcher';
// import Negotiator from 'negotiator';
// import format from 'string-format';

// import { TLocales, TTranslation } from '@/types/global';

// const dictionaries = {
//   en: () => import('../../../locales/en.json').then((module) => module.default),
//   ja: () => import('../../../locales/ja.json').then((module) => module.default),
// };

// export const getDictionary = async (locale: TLocales) => {
//   return dictionaries[locale]();
// };

// type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

// export type TDictionary = UnwrapPromise<ReturnType<typeof getDictionary>>;

// export const getLocale = (locales: TLocales[], defaultLocale: TLocales) => {
//   const headers = { 'accept-language': 'en,en;q=0.5' };
//   const languages = new Negotiator({ headers }).languages();

//   return match(languages, locales, defaultLocale); // -> 'en'
// };

// export const $t = (key: string, optional?: TTranslation) => {
//   return optional ? format(key, optional) : key;
// };
