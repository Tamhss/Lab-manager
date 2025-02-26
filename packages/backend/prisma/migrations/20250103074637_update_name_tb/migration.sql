/*
  Warnings:

  - You are about to drop the column `name` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Lab` table. All the data in the column will be lost.
  - Added the required column `deviceName` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" DROP COLUMN "name",
ADD COLUMN     "deviceName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lab" DROP COLUMN "name",
ADD COLUMN     "Labname" TEXT NOT NULL DEFAULT 'LabRoom';
