/*
  Warnings:

  - You are about to drop the column `labId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the `Lab` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_labId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "labId";

-- DropTable
DROP TABLE "Lab";
