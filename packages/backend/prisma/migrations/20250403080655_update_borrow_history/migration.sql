/*
  Warnings:

  - You are about to drop the column `borrowTime` on the `BorrowHistory` table. All the data in the column will be lost.
  - You are about to drop the column `returnTime` on the `BorrowHistory` table. All the data in the column will be lost.
  - Added the required column `actualBorrowTime` to the `BorrowHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BorrowHistory" DROP COLUMN "borrowTime",
DROP COLUMN "returnTime",
ADD COLUMN     "actualBorrowTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "actualReturnTime" TIMESTAMP(3);
