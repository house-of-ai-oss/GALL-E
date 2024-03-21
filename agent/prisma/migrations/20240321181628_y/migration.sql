/*
  Warnings:

  - You are about to drop the `_ticketTouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ticketTouser" DROP CONSTRAINT "_ticketTouser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ticketTouser" DROP CONSTRAINT "_ticketTouser_B_fkey";

-- AlterTable
ALTER TABLE "ticket" ADD COLUMN     "call_report_id" TEXT,
ADD COLUMN     "user_id" INTEGER;

-- DropTable
DROP TABLE "_ticketTouser";

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_call_report_id_fkey" FOREIGN KEY ("call_report_id") REFERENCES "call_report"("id") ON DELETE SET NULL ON UPDATE CASCADE;
