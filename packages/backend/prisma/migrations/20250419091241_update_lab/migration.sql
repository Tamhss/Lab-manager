/*
  Warnings:

  - You are about to drop the `BorrowHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BorrowHistory" DROP CONSTRAINT "BorrowHistory_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "BorrowHistory" DROP CONSTRAINT "BorrowHistory_reservationId_fkey";

-- DropForeignKey
ALTER TABLE "BorrowHistory" DROP CONSTRAINT "BorrowHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_labId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_lecturerId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserHistory" DROP CONSTRAINT "UserHistory_reservationId_fkey";

-- DropTable
DROP TABLE "BorrowHistory";

-- DropTable
DROP TABLE "Reservation";

-- CreateTable
CREATE TABLE "ReservationDevice" (
    "reservationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceId" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" "ReservationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "actualBorrowTime" TIMESTAMP(3),
    "actualReturnTime" TIMESTAMP(3),
    "lecturerId" TEXT,
    "adminApproved" BOOLEAN DEFAULT false,

    CONSTRAINT "ReservationDevice_pkey" PRIMARY KEY ("reservationId")
);

-- CreateTable
CREATE TABLE "ReservationLab" (
    "reservationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "labId" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" "ReservationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "actualBorrowTime" TIMESTAMP(3),
    "actualReturnTime" TIMESTAMP(3),
    "lecturerId" TEXT,
    "adminApproved" BOOLEAN DEFAULT false,

    CONSTRAINT "ReservationLab_pkey" PRIMARY KEY ("reservationId")
);

-- CreateTable
CREATE TABLE "DeviceBorrowHistory" (
    "borrowHistoryId" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "actualBorrowTime" TIMESTAMP(3) NOT NULL,
    "actualReturnTime" TIMESTAMP(3),
    "deviceCondition" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeviceBorrowHistory_pkey" PRIMARY KEY ("borrowHistoryId")
);

-- CreateTable
CREATE TABLE "LabBorrowHistory" (
    "borrowHistoryId" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "actualBorrowTime" TIMESTAMP(3) NOT NULL,
    "actualReturnTime" TIMESTAMP(3),
    "deviceCondition" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LabBorrowHistory_pkey" PRIMARY KEY ("borrowHistoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceBorrowHistory_reservationId_key" ON "DeviceBorrowHistory"("reservationId");

-- CreateIndex
CREATE UNIQUE INDEX "LabBorrowHistory_reservationId_key" ON "LabBorrowHistory"("reservationId");

-- AddForeignKey
ALTER TABLE "ReservationDevice" ADD CONSTRAINT "ReservationDevice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationDevice" ADD CONSTRAINT "ReservationDevice_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("deviceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationDevice" ADD CONSTRAINT "ReservationDevice_lecturerId_fkey" FOREIGN KEY ("lecturerId") REFERENCES "Lecturer"("lecturerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationLab" ADD CONSTRAINT "ReservationLab_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationLab" ADD CONSTRAINT "ReservationLab_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("labId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationLab" ADD CONSTRAINT "ReservationLab_lecturerId_fkey" FOREIGN KEY ("lecturerId") REFERENCES "Lecturer"("lecturerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceBorrowHistory" ADD CONSTRAINT "DeviceBorrowHistory_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "ReservationDevice"("reservationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceBorrowHistory" ADD CONSTRAINT "DeviceBorrowHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceBorrowHistory" ADD CONSTRAINT "DeviceBorrowHistory_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("deviceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabBorrowHistory" ADD CONSTRAINT "LabBorrowHistory_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "ReservationLab"("reservationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabBorrowHistory" ADD CONSTRAINT "LabBorrowHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabBorrowHistory" ADD CONSTRAINT "LabBorrowHistory_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("labId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "ReservationDevice"("reservationId") ON DELETE RESTRICT ON UPDATE CASCADE;
