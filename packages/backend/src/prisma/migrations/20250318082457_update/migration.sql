/*
  Warnings:

  - The values [AVAILABLE] on the enum `DeviceStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [COMPLETED] on the enum `ReservationStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `Labname` on the `Lab` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BorrowStatus" AS ENUM ('PENDING_BORROW', 'BORROWED', 'COMPLETED');

-- AlterEnum
BEGIN;
CREATE TYPE "DeviceStatus_new" AS ENUM ('IN_USE', 'NOT_IN_USE', 'DAMAGED', 'DISPOSING');
ALTER TABLE "Device" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Device" ALTER COLUMN "status" TYPE "DeviceStatus_new" USING ("status"::text::"DeviceStatus_new");
ALTER TYPE "DeviceStatus" RENAME TO "DeviceStatus_old";
ALTER TYPE "DeviceStatus_new" RENAME TO "DeviceStatus";
DROP TYPE "DeviceStatus_old";
ALTER TABLE "Device" ALTER COLUMN "status" SET DEFAULT 'NOT_IN_USE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ReservationStatus_new" AS ENUM ('PENDING', 'APPROVED_BY_LECTURER', 'APPROVED', 'REJECTED');
ALTER TABLE "Reservation" ALTER COLUMN "status" TYPE "ReservationStatus_new" USING ("status"::text::"ReservationStatus_new");
ALTER TYPE "ReservationStatus" RENAME TO "ReservationStatus_old";
ALTER TYPE "ReservationStatus_new" RENAME TO "ReservationStatus";
DROP TYPE "ReservationStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "borrowStatus" "BorrowStatus" NOT NULL DEFAULT 'PENDING_BORROW',
ALTER COLUMN "status" SET DEFAULT 'NOT_IN_USE';

-- AlterTable
ALTER TABLE "DeviceCategory" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Lab" DROP COLUMN "Labname",
ADD COLUMN     "labName" TEXT NOT NULL DEFAULT 'LabRoom';

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "adminApproved" BOOLEAN DEFAULT false,
ADD COLUMN     "lecturerId" TEXT,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lecturerId" TEXT;

-- CreateTable
CREATE TABLE "BorrowHistory" (
    "id" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "borrowTime" TIMESTAMP(3) NOT NULL,
    "returnTime" TIMESTAMP(3),
    "deviceCondition" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BorrowHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BorrowHistory_reservationId_key" ON "BorrowHistory"("reservationId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lecturerId_fkey" FOREIGN KEY ("lecturerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_lecturerId_fkey" FOREIGN KEY ("lecturerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowHistory" ADD CONSTRAINT "BorrowHistory_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowHistory" ADD CONSTRAINT "BorrowHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowHistory" ADD CONSTRAINT "BorrowHistory_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
