/*
  Warnings:

  - You are about to drop the `UserHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Session" AS ENUM ('MORNING', 'AFTERNOON', 'EVENING');

-- DropForeignKey
ALTER TABLE "UserHistory" DROP CONSTRAINT "UserHistory_deviceReservationId_fkey";

-- DropForeignKey
ALTER TABLE "UserHistory" DROP CONSTRAINT "UserHistory_userId_fkey";

-- DropTable
DROP TABLE "UserHistory";

-- CreateTable
CREATE TABLE "LabUsage" (
    "labUsageId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "session" "Session" NOT NULL,
    "usageDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabUsage_pkey" PRIMARY KEY ("labUsageId")
);

-- CreateTable
CREATE TABLE "RoomManagement" (
    "roomId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "imageUrl" TEXT,
    "status" TEXT NOT NULL,
    "lecturerId" TEXT,
    "schedule" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomManagement_pkey" PRIMARY KEY ("roomId")
);

-- AddForeignKey
ALTER TABLE "LabUsage" ADD CONSTRAINT "LabUsage_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("labId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomManagement" ADD CONSTRAINT "RoomManagement_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("labId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomManagement" ADD CONSTRAINT "RoomManagement_lecturerId_fkey" FOREIGN KEY ("lecturerId") REFERENCES "Lecturer"("lecturerId") ON DELETE SET NULL ON UPDATE CASCADE;
