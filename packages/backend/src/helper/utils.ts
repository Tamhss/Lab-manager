/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-var-requires */
import { extname } from 'path';

import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DateTime } from 'luxon';
import * as winston from 'winston';

import { ErrorMessage, FORMAT_TYPE } from '@core/enum';
import { IJwtPayload, IPaginationResponse } from '@core/interface';
import iconv from 'iconv-lite';

const jwt = require('jsonwebtoken');

const { combine, timestamp, label, printf } = winston.format;

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1;
const currentDate = date.getDate();

export function getWinstonFormat() {
  const myFormat = printf(({ level, message, _label, timestamp }) => {
    return `[${level.toLocaleUpperCase()}] ${timestamp} Message: ${message}`;
  });
  return combine(label({}), timestamp(), myFormat);
}

export function getWinstonPathFile() {
  return new winston.transports.File({
    filename: `${process.cwd()}/logs/${currentYear}-${currentMonth}-${currentDate < 10 ? '0' + currentDate : currentDate
      }_file_log.json`,
    level: 'error',
  });
}

export const imageFileFilter = (req, file, callback) => {
  if (
    !file.originalname.match(/\.(jpg|jpeg|png|gif|heic|mp3|docs|docx|pdf)$/)
  ) {
    return callback(
      new HttpException(ErrorMessage.ONLY_IMAGE, HttpStatus.BAD_REQUEST),
      false,
    );
  }
  callback(null, true);
};

export const allFileFilter = (req, file, callback) => {
  if (file.originalname.match(/\.(mp4)$/)) {
    return callback(
      new HttpException(ErrorMessage.INVALID_PARAM, HttpStatus.BAD_REQUEST),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  // const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(
    null,
    `${new Date('2012.08.10').getTime() / 1000}-${randomName}${fileExtName}`,
  );
};

export function returnUrlImages(data: Array<{ filename: string }>) {
  return data.map((e) => {
    return `${process.env.DOMAIN_BE}/upload/${e.filename}`;
  });
}

export function returnPagingData<T>(
  data: T,
  totalItems: number,
  params: { page: number; take: number },
): IPaginationResponse<T> {
  return {
    data,
    totalItems,
    page: params.page,
    totalPages: Math.ceil(totalItems / params.take),
    take: params.take,
  };
}

export function formatPagingQuery(params: {
  page: number;
  take: number;
  skip: number;
}) {
  params.page = Number(params.page) || 1;
  params.take = Number(params.take) || 10;
  params.skip = (params.page - 1) * params.take;
  return params;
}

export function formatPagingQueryForStripe(params: {
  page: number;
  take: number;
}) {
  params.page = params.page || undefined;
  params.take = Number(params.take) || 10;
  return params;
}

export async function handleBCRYPTCompare(text: string, hash: string) {
  return await bcrypt.compare(text, hash);
}

/**
 *
 * @param data
 * @param expiresIn by hour, exp: "1h"
 * @returns
 */
export function handleJWTEncode(data: object, expiresIn?: string) {
  const encodeData = jwt.sign(
    data,
    process.env.SECRET_KEY_VALIDATION_TOKEN_URL,
    {
      expiresIn: expiresIn || process.env.EXPIRE_VALIDATION_TOKEN_URL + 's',
    },
  );
  return encodeData;
}

export function handleJWTVerify(token: string): IJwtPayload {
  try {
    const decodeData = jwt.verify(
      token,
      process.env.SECRET_KEY_VALIDATION_TOKEN_URL,
    );
    return decodeData;
  } catch (error) {
    throw new HttpException(ErrorMessage.TOKEN_FAILED, HttpStatus.BAD_REQUEST);
  }
}

export function generateCode(size?: number) {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let inviteCode = '';
  for (let i = 0; i < (size ? size : 8); i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    inviteCode += chars[randomIndex];
  }

  return inviteCode;
}

export function generateRandomPassword(size?: number) {
  const specials = '!@#$%';
  const characters =
    'abcdefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + '0123456789';
  const passwordLength = size || 8;
  let password = '';
  for (let i = 0; i < passwordLength - 1; i++) {
    const char = Math.floor(Math.random() * characters.length);
    password += characters.charAt(char);
  }
  const specialPosition = Math.floor(Math.random() * passwordLength);
  const tailPassword = password.slice(specialPosition);
  const headPassword = password.slice(0, specialPosition);
  password =
    headPassword +
    specials.charAt(Math.floor(Math.random() * specials.length)) +
    tailPassword;
  return password;
}

export const formatDate = (
  date: string | Date,
  formatType: FORMAT_TYPE,
): string | undefined => {
  if (!date) return;
  const d = typeof date === 'string' ? new Date(date) : date;

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return DateTime.fromJSDate(d, {
    zone: tz || 'Asia/Tokyo',
  }).toFormat(formatType);
};

export async function handleBCRYPTHash(text: string) {
  const passwordSalt = await bcrypt.genSalt();
  return await bcrypt.hash(text, passwordSalt);
}

export function convertStringToDate(dateString) {
  if (dateString.length !== 8) {
    return new Error('Incorrect dateString');
  }

  const year = parseInt(dateString.slice(0, 4));
  const month = parseInt(dateString.slice(4, 6)) - 1;
  const day = parseInt(dateString.slice(6));

  return new Date(year, month, day);
}

export function convertYYYYMMDDToDate(dateString: string) {
  if (!dateString || dateString.length !== 8) {
    return null;
  }

  const year = parseInt(dateString.slice(0, 4));
  const month = parseInt(dateString.slice(4, 6)) - 1;
  const day = parseInt(dateString.slice(6));

  return new Date(year, month, day);
}

export function convertStringToDateWithoutError(dateString) {
  const year = parseInt(dateString.slice(0, 4));
  const month = parseInt(dateString.slice(4, 6)) - 1;
  const day = parseInt(dateString.slice(6));

  return new Date(year, month, day);
}


export function calculateTimeDifference(from: string, to: string) {
  const fromHour = parseInt(from.slice(0, 2), 10);
  const fromMinute = parseInt(from.slice(2), 10);
  const totalFromMinutes = fromHour * 60 + fromMinute;

  const toHour = parseInt(to.slice(0, 2), 10);
  const toMinute = parseInt(to.slice(2), 10);
  const totalToMinutes = toHour * 60 + toMinute;

  const differenceMinutes = totalToMinutes - totalFromMinutes;

  const hh = String(Math.floor(differenceMinutes / 60)).padStart(2, '0');
  const mm = String(differenceMinutes % 60).padStart(2, '0');

  return hh + mm;
}

export function convertToDecimalHours(time: string) {
  const hour = parseInt(time.slice(0, 2), 10);
  const minute = parseInt(time.slice(2), 10);

  const decimalHours = hour + minute / 60;

  return Number(decimalHours.toFixed(2));
}

export function convertDateToString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
}

export function formatDateToYYYYMMDDHHMMSS(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const milliseconds = String(date.getMilliseconds()).padStart(6, '0'); // Ensure 6 digits for microseconds

  return `${year}${month}${day}${hours}${minutes}${seconds}.${milliseconds}`;
}
