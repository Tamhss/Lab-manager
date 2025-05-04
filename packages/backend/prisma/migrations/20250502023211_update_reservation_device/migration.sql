-- AlterTable
ALTER TABLE "ReservationDevice" ADD COLUMN     "labId" TEXT;

-- AddForeignKey
ALTER TABLE "ReservationDevice" ADD CONSTRAINT "ReservationDevice_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("labId") ON DELETE SET NULL ON UPDATE CASCADE;
