/*
  Warnings:

  - You are about to drop the `MonitorDevice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServerDevice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MonitorDevice" DROP CONSTRAINT "MonitorDevice_id_fkey";

-- DropForeignKey
ALTER TABLE "ServerDevice" DROP CONSTRAINT "ServerDevice_id_fkey";

-- DropTable
DROP TABLE "MonitorDevice";

-- DropTable
DROP TABLE "ServerDevice";
