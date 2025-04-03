export enum Role {
    STUDENT = 'STUDENT',
    LECTURER = 'LECTURER',
    ADMIN = 'ADMIN',
  }
  
  export enum DeviceStatus {
    IN_USE = 'IN_USE',
    NOT_IN_USE = 'NOT_IN_USE',
    DAMAGED = 'DAMAGED',
    DISPOSING = 'DISPOSING',
  }
  
  export enum BorrowStatus {
    PENDING_BORROW = 'PENDING_BORROW',
    BORROWED = 'BORROWED',
    COMPLETED = 'COMPLETED',
  }
  
  export enum LabStatus {
    AVAILABLE = 'AVAILABLE',
    IN_USE = 'IN_USE',
    UNDER_MAINTENANCE = 'UNDER_MAINTENANCE',
  }
  
  export enum ReservationStatus {
    PENDING = 'PENDING',
    APPROVED_BY_LECTURER = 'APPROVED_BY_LECTURER',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
  }