export const configuration = () => ({
  tz: process.env.TZ,
  environment: process.env.NODE_ENV,
  appName: process.env.APP_NAME,
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  docker: {
    port: process.env.DOCKER_APP_PORT
      ? parseInt(process.env.DOCKER_APP_PORT, 10)
      : 3000,
    postgresqlPort: process.env.DOCKER_DB_POSTGRES_PORT
      ? parseInt(process.env.DOCKER_DB_POSTGRES_PORT, 10)
      : 5432,
  },
  databasePostgresql: {
    host: process.env.DB_POSTGRES_HOST,
    port: process.env.DB_POSTGRES_PORT
      ? parseInt(process.env.DB_POSTGRES_PORT, 10)
      : 5432,
    user: process.env.DB_POSTGRES_USER,
    password: process.env.DB_POSTGRES_PASSWORD,
    name: process.env.DB_POSTGRES_NAME,
    trigger: process.env.DB_POSTGRES_TRIGGER
      ? JSON.parse(process.env.DB_POSTGRES_TRIGGER)
      : false,
  },
  mongo: {
    url: process.env.MONGO_URL,
  },
  auth: {
    secret: process.env.SECRET_KEY,
    expire: process.env.EXPIRE_TOKEN + 's',
    secretKeyValidationTokenUrl: process.env.SECRET_KEY_VALIDATION_TOKEN_URL,
    expireValidationTokenUrl: process.env.EXPIRE_VALIDATION_TOKEN_URL + 's',
    secretKeyRefreshToken: process.env.SECRET_KEY_REFRESH_TOKEN,
    expire_access_token: process.env.EXPIRE_ACCESS_TOKEN + 's',
    expire_refresh_token: process.env.EXPIRE_REFRESH_TOKEN + 's',
    privateKey: process.env.RSA_PRIVATE_KEY
      ? process.env.RSA_PRIVATE_KEY.replace(/\\n/g, '\n')
      : '',
    publicKey: process.env.RSA_PUBLIC_KEY
      ? process.env.RSA_PUBLIC_KEY.replace(/\\n/g, '\n')
      : '',
  },
  winston: {
    path: process.env.WINSTON_LOG_PATH,
  },
  client: {
    url: process.env.CLIENT_URL,
  },
  cms: {
    url: process.env.CMS_URL,
  },
  aws: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
    s3: {
      bucket: process.env.AWS_S3_BUCKET,
      url: process.env.AWS_S3_URL,
    },
    ses: {
      email: process.env.AWS_SES_EMAIL,
    },
  },
  time: {
    forgotPasswordExpiredTime: Number(process.env.FORGOT_PASSWORD_EXPIRED_TIME),
    registerExpiredTime: Number(process.env.REGISTER_EXPIRED_TIME),
  },
  api: {
    regi: process.env.URL_API_REGI
  }
});

export enum EConfiguration {
  TZ = 'tz',

  ENVIRONMENT = 'environment',
  APP_NAME = 'appName',
  PORT = 'port',

  DOCKER_APP_PORT = 'docker.port',
  DOCKER_DB_POSTGRES_PORT = 'docker.postgresqlPort',
  DOCKER_DB_REDIS_PORT = 'docker.redisPort',

  DB_POSTGRES_HOST = 'databasePostgresql.host',
  DB_POSTGRES_PORT = 'databasePostgresql.port',
  DB_POSTGRES_USER = 'databasePostgresql.user',
  DB_POSTGRES_PASSWORD = 'databasePostgresql.password',
  DB_POSTGRES_NAME = 'databasePostgresql.name',
  DB_POSTGRES_TRIGGER = 'databasePostgresql.trigger',

  AUTH_SECRET_KEY = 'auth.secret',
  AUTH_TOKEN_EXPIRE = 'auth.expire',
  AUTH_SECRET_KEY_REFRESH_TOKEN = 'auth.secretKeyRefreshToken',
  AUTH_ACCESS_TOKEN_EXPIRE = 'auth.expire_access_token',
  AUTH_REFRESH_TOKEN_EXPIRE = 'auth.expire_refresh_token',
  RSA_PRIVATE_KEY = 'auth.privateKey',
  RSA_PUBLIC_KEY = 'auth.publicKey',
  SECRET_KEY_VALIDATION_TOKEN_URL = 'auth.secretKeyValidationTokenUrl',
  EXPIRE_VALIDATION_TOKEN_URL = 'auth.expireValidationTokenUrl',

  WINSTON_LOG_PATH = 'winston.path',
  DOMAIN_FRONTEND = 'domain.frontEnd',

  AWS_SECRET_ACCESS_KEY = 'aws.secretAccessKey',
  AWS_ACCESS_KEY_ID = 'aws.accessKeyId',
  AWS_REGION = 'aws.region',

  AWS_S3_BUCKET = 'aws.s3.bucket',
  AWS_S3_URL = 'aws.s3.url',

  AWS_SES_EMAIL = 'aws.ses.email',

  MONGO_URL = 'mongo.url',

  FORGOT_PASSWORD_EXPIRED_TIME = 'time.forgotPasswordExpiredTime',
  REGISTER_EXPIRED_TIME = 'time.registerExpiredTime',

  URL_API_REGI = 'api.regi'
}
