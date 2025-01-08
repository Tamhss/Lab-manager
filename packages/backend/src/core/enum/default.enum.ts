export enum EEnvironment {
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  TEST = 'test',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export enum EStatus {
  SUCCESS = 0,
  ERROR = 1,
}

export enum EDisplayStatus {
  DISABLE = 'DISABLE',
  ENABLE = 'ENABLE',
  DELETE = 'DELETE',
}


export enum EIsDelete {
  NOT_DELETE = 0,
  DELETED = 1,
}

export enum EAccountType {
  SYSTEM = 1,
  TEMPLE = 2,
  FAMILY = 3,
  PUBLIC_USER = 4,
  GUEST = 5,
}

export enum EAccountStatus {
  INVITED = 1,
  NOT_INVITED = 0,
  ACCOUNT_CREATED = 2,
  NO_EMAIL = 3,
  LEAVE_ORGANIZATION = 4,
  DELETED = 5,
}

export enum EGender {
  FEMALE = 0,
  MALE = 1,
  OTHER = 2,
}

export enum EAppLanguage {
  EN = 'en',
}

export enum EIsPrivate {
  NOT_PRIVATE = 0,
  PRIVATE = 1,
}

export enum ETempleStatus {
  NOT_APPROVED = 'NOT_APPROVED', // not approved
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED', // temple is approved but it is blocked
  LEAVE_ORGANIZATION = 'LEAVE_ORGANIZATION',
}

export enum EMemoryServiceStatus {
  CANCEL = 1,
  OPEN = 2,
  ON_GOING = 3,
}

export enum ESystemSettingType {
  TEMPLE_EMAIL_RESET_PASSWORD = 'Temple_Email_Reset_Password',
  TEMPLE_EMAIL_CHANGE_EMAIL = 'Temple_Email_Change_Email',
}

export enum EPermissionKey {
  SYSTEM_CONTENT_VIEW = 'SYSTEM_CONTENT_VIEW',
  SYSTEM_CONTENT_EDIT = 'SYSTEM_CONTENT_EDIT',
}

export enum ERole {
  SYSTEM_SUPER_ADMIN = 'SYSTEM_SUPER_ADMIN',
  SYSTEM_MANAGER = 'SYSTEM_MANAGER',
  TEMPLE_SUPER_ADMIN = 'TEMPLE_SUPER_ADMIN',
  TEMPLE_MANAGER = 'TEMPLE_MANAGER',
  FAMILY_ADMIN = 'FAMILY_ADMIN',
  FAMILY_MEMBER = 'FAMILY_MEMBER',
  PUBLIC_USER = 'PUBLIC_USER',
  GUEST = 'GUEST',
}

export enum EFamilyInvitation {
  REGISTERED = 'REGISTERED',
  UN_REGISTERED = 'UN_REGISTERED',
}

export enum ETempleEventParticipant {
  FAMILY_ADMIN = 'FAMILY_ADMIN',
  FAMILY_MEMBER = 'FAMILY_MEMBER',
  PUBLIC_USER = 'PUBLIC_USER',
  GUEST = 'GUEST',
}

export enum EParticipantEventStatus {
  COMING_SOON = 'COMING_SOON',
  HISTORY = 'HISTORY',
}

export enum ETempleEventStatus {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
  CLOSE = 'CLOSE', // Can not booking, but can see
  DELETE = 'DELETE', // Can not booking and can not see
}

export enum ETempleEventUserStatus {
  BOOKING = 'BOOKING', // user request
  CONFIRMED = 'CONFIRMED', // temple confirm
  CANCEL = 'CANCEL', // user cancel
  REJECT = 'REJECT', // temple cancel
  CHECK_IN = 'CHECK_IN', // user in the event
  NOT_COME = 'NOT_COME', // user not come
}

export enum EFamilyMemberAccessDeceasedStatus {
  DENY = 'DENY',
  ALLOW = 'ALLOW',
}

export enum EMSystemSettingMailType {
  SYSTEM_CREATE_SUB_ACCOUNT = 'SYSTEM_CREATE_ACCOUNT',
  SYSTEM_APPROVED_CREATE_TEMPLE = 'SYSTEM_APPROVED_CREATE_TEMPLE',
  SYSTEM_REQUEST_CHANGE_EMAIL = 'SYSTEM_REQUEST_CHANGE_EMAIL',
  SYSTEM_ACCEPT_CHANGE_EMAIL = 'SYSTEM_ACCEPT_CHANGE_EMAIL',
  SYSTEM_REQUEST_RESET_PASSWORD = 'SYSTEM_REQUEST_RESET_PASSWORD',
  SYSTEM_NOTICE_GUEST_REQUEST_CREATE_TEMPLE_SUCCESS = 'SYSTEM_NOTICE_GUEST_REQUEST_CREATE_TEMPLE_SUCCESS',
  SYSTEM_UPDATE_INFO_TEMPLE = 'SYSTEM_UPDATE_INFO_TEMPLE',
  SYSTEM_APPROVED_REQUEST_CREATE_TEMPLE = 'SYSTEM_APPROVED_REQUEST_CREATE_TEMPLE',
  GUEST_REQUEST_CREATE_TEMPLE = 'GUEST_REQUEST_CREATE_TEMPLE',
  SYSTEM_BLOCK_ACCOUNT_TEMPLE = 'SYSTEM_BLOCK_ACCOUNT_TEMPLE',
  SYSTEM_DELETE_BLOCK_ACCOUNT_TEMPLE = 'SYSTEM_DELETE_BLOCK_ACCOUNT_TEMPLE',
  SYSTEM_DELETE_ACCOUNT_TEMPLE = 'SYSTEM_DELETE_ACCOUNT_TEMPLE',
  SYSTEM_UPDATE_PLAN = 'SYSTEM_UPDATE_PLAN',
  SYSTEM_CREATE_NEWS = 'SYSTEM_CREATE_NEWS',
}

export enum EValidationTokenType {
  SYSTEM_REQUEST_CHANGE_EMAIL = 'SYSTEM_REQUEST_CHANGE_EMAIL',
  SYSTEM_VERIFY_CHANGE_EMAIL = 'SYSTEM_VERIFY_CHANGE_EMAIL',
  SYSTEM_REQUEST_RESET_PASSWORD = 'SYSTEM_REQUEST_RESET_PASSWORD',
  TEMPLE_REQUEST_CHANGE_EMAIL = 'TEMPLE_REQUEST_CHANGE_EMAIL',
  TEMPLE_VERIFY_CHANGE_EMAIL = 'TEMPLE_VERIFY_CHANGE_EMAIL',
  TEMPLE_REQUEST_RESET_PASSWORD = 'TEMPLE_REQUEST_RESET_PASSWORD',
  TEMPLE_INVITE_USER = 'TEMPLE_INVITE_USER',
  TEMPLE_REINVITE_USER = 'TEMPLE_REINVITE_USER',
  TEMPLE_INVITE_PUBLIC_USER = 'TEMPLE_INVITE_PUBLIC_USER',
  USER_VERIFY_CREATE_USER = 'USER_VERIFY_CREATE_USER',
  USER_VERIFY_CREATE_PUBLIC_USER = 'USER_VERIFY_CREATE_PUBLIC_USER',
  FAMILY_ADMIN_INVITE_MEMBER = 'FAMILY_ADMIN_INVITE_MEMBER',
  USER_REQUEST_RESET_PASSWORD = 'USER_REQUEST_RESET_PASSWORD',
  FAMILY_ADMIN_REINVITE_FAMILY_MEMBER = 'FAMILY_ADMIN_REINVITE_FAMILY_MEMBER',
  USER_REQUEST_CHANGE_EMAIL = 'USER_REQUEST_CHANGE_EMAIL',
  SYSTEM_SWITCH_ACCOUNT = 'SYSTEM_SWITCH_ACCOUNT',
  SYSTEM_REGISTER = 'SYSTEM_REGISTER',
}

export enum EAnniversaryStatus {
  INSTRUCTING = 'INSTRUCTING',
  NEW_REQUEST = 'NEW_REQUEST',
  SELECTING_DATE = 'SELECTING_DATE',
  SELECTED_DATE = 'SELECTED_DATE',
  END = 'END',
  CANCEL = 'CANCEL',
  REJECT = 'REJECT',
}

export enum EAnniversaryPresideType {
  FAMILY_ADMIN = 'FAMILY_ADMIN',
  MONK = 'MONK',
}

export enum EMTempleSettingAnniversaryUnit {
  DAY = 'DAY',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export enum ENewsStatus {
  DRAFT = 'DRAFT',
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

export enum ENewsTarget {
  FAMILY_ADMIN = 'FAMILY_ADMIN',
  FAMILY_MEMBER = 'FAMILY_MEMBER',
  PUBLIC_USER = 'PUBLIC_USER',
  FAMILY_ADMIN_MEMBER_PUBLIC_USER = 'FAMILY_ADMIN_MEMBER_PUBLIC_USER',
  ALL_ADMIN_TEMPLE = 'ALL_ADMIN_TEMPLE',
  GROUP_ADMIN_TEMPLE = 'GROUP_ADMIN_TEMPLE',
  SINGLE_ADMIN_TEMPLE = 'SINGLE_ADMIN_TEMPLE',
}

export enum ENewsTargetItemRead {
  READ = 'READ',
  UN_READ = 'UN_READ',
}

export enum ENewsSenderType {
  SYSTEM = 'SYSTEM',
  TEMPLE = 'TEMPLE',
}

export enum EImportCSVAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

export enum EActivityRead {
  READ = 'READ',
  UN_READ = 'UN_READ',
}

export enum EMessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  FILE = 'FILE',
}

export enum EMessageSide {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export enum EConversationMemberRead {
  READ = 'READ',
  UN_READ = 'UN_READ',
}

export enum EConversationSystem {
  YES = 'YES',
  NO = 'NO',
}

export enum EActivityType {
  NOTICE = 'NOTICE', // mail
  DIRECTION = 'DIRECTION', // ring
}

/**
 * @description This enum values follow the values of Stripe
 */
export enum ESubscriptionStatus {
  ACTIVE = 'active',
  CANCELED = 'canceled',
  INCOMPLETE = 'incomplete', //  default value for TemplePayment.stripe_subscription_status
  INCOMPLETE_EXPIRED = 'incomplete_expired',
  PAST_DUE = 'past_due',
  PAUSED = 'paused',
  TRIALING = 'trialing',
  UNPAID = 'unpaid',
}

export enum FORMAT_TYPE {
  YEAR_MONTH = 'MM/yyyy',
  YEAR_MONTH_DAY = 'dd-MM-yyyy',
  YEAR_DAY_TIME_DATE_NO_PADDING = 'd/M/yyyy (EEE) H:mm',
  YEAR_DAY_WEEKDAY_NO_PADDING = 'd/M/yyyy (EEE)',
  YEAR_DAY_NO_PADDING = 'dd/MM/yyyy',
  YEAR_DAY_HYPHEN = 'dd-MM-yyyy',
  YEAR_DAY_SLASH = 'dd/MM/yyyy',
  YEAR_DAY_TIME_SLASH = 'dd/MM/yyyy HH:mm',
  YEAR_DAY_TIME_SECOND_NOT_SEPARATE = 'ddMMyyyyHHmmss',
  TIME = 'H:mm',
  FULL_TIME = 'HH:mm:ss',
  YEAR_DAY_NO_PADDING_TIME = 'dd/MM/yyyy HH:mm',
}

export enum EDeviceType {
  PC = 'PC',
  MOBILE = 'MOBILE',
}

export enum TypeFile {
  CSV = 'CSV',
  TSV = 'TSV'
}

export enum UrlApi {
  regi = 'order_staff/result'
}
