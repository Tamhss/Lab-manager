/*
  Warnings:

  - You are about to drop the column `deviceCondition` on the `LabBorrowHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LabBorrowHistory" DROP COLUMN "deviceCondition",
ADD COLUMN     "labCondition" TEXT;
