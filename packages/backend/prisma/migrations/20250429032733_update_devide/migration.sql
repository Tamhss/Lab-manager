/*
  Warnings:

  - A unique constraint covering the columns `[labId,name]` on the table `DeviceCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `labId` to the `DeviceCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeviceCategory" ADD COLUMN     "labId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DeviceCategory_labId_name_key" ON "DeviceCategory"("labId", "name");

-- AddForeignKey
ALTER TABLE "DeviceCategory" ADD CONSTRAINT "DeviceCategory_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("labId") ON DELETE RESTRICT ON UPDATE CASCADE;
