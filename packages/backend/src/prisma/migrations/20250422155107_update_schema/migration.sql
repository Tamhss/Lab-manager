/*
  Warnings:

  - You are about to drop the column `reservationId` on the `DeviceBorrowHistory` table. All the data in the column will be lost.
  - You are about to drop the column `reservationId` on the `LabBorrowHistory` table. All the data in the column will be lost.
  - You are about to drop the `Login` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[labReservationId]` on the table `DeviceBorrowHistory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[deviceReservationId]` on the table `LabBorrowHistory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `labReservationId` to the `DeviceBorrowHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceReservationId` to the `LabBorrowHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DeviceBorrowHistory" DROP CONSTRAINT "DeviceBorrowHistory_reservationId_fkey";

-- DropForeignKey
ALTER TABLE "LabBorrowHistory" DROP CONSTRAINT "LabBorrowHistory_reservationId_fkey";

-- DropIndex
DROP INDEX "DeviceBorrowHistory_reservationId_key";

-- DropIndex
DROP INDEX "LabBorrowHistory_reservationId_key";

-- AlterTable
ALTER TABLE "DeviceBorrowHistory" DROP COLUMN "reservationId",
ADD COLUMN     "labReservationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LabBorrowHistory" DROP COLUMN "reservationId",
ADD COLUMN     "deviceReservationId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Login";

-- CreateIndex
CREATE UNIQUE INDEX "DeviceBorrowHistory_labReservationId_key" ON "DeviceBorrowHistory"("labReservationId");

-- CreateIndex
CREATE UNIQUE INDEX "LabBorrowHistory_deviceReservationId_key" ON "LabBorrowHistory"("deviceReservationId");

-- AddForeignKey
ALTER TABLE "DeviceBorrowHistory" ADD CONSTRAINT "DeviceBorrowHistory_labReservationId_fkey" FOREIGN KEY ("labReservationId") REFERENCES "ReservationDevice"("reservationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabBorrowHistory" ADD CONSTRAINT "LabBorrowHistory_deviceReservationId_fkey" FOREIGN KEY ("deviceReservationId") REFERENCES "ReservationLab"("reservationId") ON DELETE RESTRICT ON UPDATE CASCADE;
