/*
  Warnings:

  - A unique constraint covering the columns `[labId]` on the table `DeviceCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DeviceCategory_labId_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "DeviceCategory_labId_key" ON "DeviceCategory"("labId");
