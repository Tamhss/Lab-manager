export const CONSTANTS = {
  jwt: {
    expiresIn: 60 * 60 * 24,
  },
  prisma: {
    maxTimeoutMs: 40_000,
  },
  dateTime: {
    jst: 7,
  },
  file: {
    minSizeByte: 0,
    maxSizeByte: 20_971_520,
    attachmentsFetchMaxRetryCount: 100,
    attachmentsFetchRetryDelayMilliSeconds: 1000,
  },
  multiFileUpload: {
    minSizeByte: 5_242_880,
  },
  cookie: {
    maxAage: 2 * 24 * 60 * 60 * 1000,
  },
};
