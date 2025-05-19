/*
  Warnings:

  - You are about to drop the `LabUsage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoomManagement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LabUsage" DROP CONSTRAINT "LabUsage_labId_fkey";

-- DropForeignKey
ALTER TABLE "RoomManagement" DROP CONSTRAINT "RoomManagement_labId_fkey";

-- DropForeignKey
ALTER TABLE "RoomManagement" DROP CONSTRAINT "RoomManagement_lecturerId_fkey";

-- DropTable
DROP TABLE "LabUsage";

-- DropTable
DROP TABLE "RoomManagement";

-- DropEnum
DROP TYPE "Session";
