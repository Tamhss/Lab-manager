/*
  Warnings:

  - You are about to drop the column `status` on the `Device` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[device_id]` on the table `Device` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `device_id` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" DROP COLUMN "status",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "device_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "DeviceCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DeviceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServerDevice" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "cpu" TEXT NOT NULL,
    "ram" TEXT NOT NULL,
    "storage" TEXT NOT NULL,

    CONSTRAINT "ServerDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonitorDevice" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "screenSize" TEXT NOT NULL,
    "resolution" TEXT NOT NULL,

    CONSTRAINT "MonitorDevice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceCategory_name_key" ON "DeviceCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ServerDevice_deviceId_key" ON "ServerDevice"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "MonitorDevice_deviceId_key" ON "MonitorDevice"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Device_device_id_key" ON "Device"("device_id");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "DeviceCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServerDevice" ADD CONSTRAINT "ServerDevice_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonitorDevice" ADD CONSTRAINT "MonitorDevice_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
