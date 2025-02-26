/*
  Warnings:

  - You are about to drop the column `device_id` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `deviceId` on the `MonitorDevice` table. All the data in the column will be lost.
  - You are about to drop the column `deviceId` on the `ServerDevice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MonitorDevice" DROP CONSTRAINT "MonitorDevice_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "ServerDevice" DROP CONSTRAINT "ServerDevice_deviceId_fkey";

-- DropIndex
DROP INDEX "Device_device_id_key";

-- DropIndex
DROP INDEX "MonitorDevice_deviceId_key";

-- DropIndex
DROP INDEX "ServerDevice_deviceId_key";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "device_id";

-- AlterTable
ALTER TABLE "MonitorDevice" DROP COLUMN "deviceId";

-- AlterTable
ALTER TABLE "ServerDevice" DROP COLUMN "deviceId";

-- AddForeignKey
ALTER TABLE "ServerDevice" ADD CONSTRAINT "ServerDevice_id_fkey" FOREIGN KEY ("id") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonitorDevice" ADD CONSTRAINT "MonitorDevice_id_fkey" FOREIGN KEY ("id") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
