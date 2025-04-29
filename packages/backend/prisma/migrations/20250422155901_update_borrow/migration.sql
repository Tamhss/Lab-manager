/*
  Warnings:

  - You are about to drop the column `labReservationId` on the `DeviceBorrowHistory` table. All the data in the column will be lost.
  - You are about to drop the column `deviceReservationId` on the `LabBorrowHistory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[deviceReservationId]` on the table `DeviceBorrowHistory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[labReservationId]` on the table `LabBorrowHistory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deviceReservationId` to the `DeviceBorrowHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labReservationId` to the `LabBorrowHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DeviceBorrowHistory" DROP CONSTRAINT "DeviceBorrowHistory_labReservationId_fkey";

-- DropForeignKey
ALTER TABLE "LabBorrowHistory" DROP CONSTRAINT "LabBorrowHistory_deviceReservationId_fkey";

-- DropIndex
DROP INDEX "DeviceBorrowHistory_labReservationId_key";

-- DropIndex
DROP INDEX "LabBorrowHistory_deviceReservationId_key";

-- AlterTable
ALTER TABLE "DeviceBorrowHistory" DROP COLUMN "labReservationId",
ADD COLUMN     "deviceReservationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LabBorrowHistory" DROP COLUMN "deviceReservationId",
ADD COLUMN     "labReservationId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DeviceBorrowHistory_deviceReservationId_key" ON "DeviceBorrowHistory"("deviceReservationId");

-- CreateIndex
CREATE UNIQUE INDEX "LabBorrowHistory_labReservationId_key" ON "LabBorrowHistory"("labReservationId");

-- AddForeignKey
ALTER TABLE "DeviceBorrowHistory" ADD CONSTRAINT "DeviceBorrowHistory_deviceReservationId_fkey" FOREIGN KEY ("deviceReservationId") REFERENCES "ReservationDevice"("reservationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabBorrowHistory" ADD CONSTRAINT "LabBorrowHistory_labReservationId_fkey" FOREIGN KEY ("labReservationId") REFERENCES "ReservationLab"("reservationId") ON DELETE RESTRICT ON UPDATE CASCADE;
