/*
  Warnings:

  - The primary key for the `ReservationDevice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `reservationId` on the `ReservationDevice` table. All the data in the column will be lost.
  - The primary key for the `ReservationLab` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `reservationId` on the `ReservationLab` table. All the data in the column will be lost.
  - You are about to drop the column `reservationId` on the `UserHistory` table. All the data in the column will be lost.
  - The required column `deviceReservationId` was added to the `ReservationDevice` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `labReservationId` was added to the `ReservationLab` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `deviceReservationId` to the `UserHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DeviceBorrowHistory" DROP CONSTRAINT "DeviceBorrowHistory_deviceReservationId_fkey";

-- DropForeignKey
ALTER TABLE "LabBorrowHistory" DROP CONSTRAINT "LabBorrowHistory_labReservationId_fkey";

-- DropForeignKey
ALTER TABLE "UserHistory" DROP CONSTRAINT "UserHistory_reservationId_fkey";

-- AlterTable
ALTER TABLE "ReservationDevice" DROP CONSTRAINT "ReservationDevice_pkey",
DROP COLUMN "reservationId",
ADD COLUMN     "deviceReservationId" TEXT NOT NULL,
ADD CONSTRAINT "ReservationDevice_pkey" PRIMARY KEY ("deviceReservationId");

-- AlterTable
ALTER TABLE "ReservationLab" DROP CONSTRAINT "ReservationLab_pkey",
DROP COLUMN "reservationId",
ADD COLUMN     "labReservationId" TEXT NOT NULL,
ADD CONSTRAINT "ReservationLab_pkey" PRIMARY KEY ("labReservationId");

-- AlterTable
ALTER TABLE "UserHistory" DROP COLUMN "reservationId",
ADD COLUMN     "deviceReservationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "DeviceBorrowHistory" ADD CONSTRAINT "DeviceBorrowHistory_deviceReservationId_fkey" FOREIGN KEY ("deviceReservationId") REFERENCES "ReservationDevice"("deviceReservationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabBorrowHistory" ADD CONSTRAINT "LabBorrowHistory_labReservationId_fkey" FOREIGN KEY ("labReservationId") REFERENCES "ReservationLab"("labReservationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_deviceReservationId_fkey" FOREIGN KEY ("deviceReservationId") REFERENCES "ReservationDevice"("deviceReservationId") ON DELETE RESTRICT ON UPDATE CASCADE;
