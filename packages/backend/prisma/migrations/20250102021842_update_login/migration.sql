/*
  Warnings:

  - You are about to drop the column `force_change` on the `Login` table. All the data in the column will be lost.
  - You are about to drop the column `main_class` on the `Login` table. All the data in the column will be lost.
  - You are about to drop the column `pass_husiyo_flag` on the `Login` table. All the data in the column will be lost.
  - You are about to drop the column `syain_id` on the `Login` table. All the data in the column will be lost.
  - You are about to drop the column `syain_name` on the `Login` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Login" DROP COLUMN "force_change",
DROP COLUMN "main_class",
DROP COLUMN "pass_husiyo_flag",
DROP COLUMN "syain_id",
DROP COLUMN "syain_name";
