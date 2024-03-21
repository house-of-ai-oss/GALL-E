/*
  Warnings:

  - The primary key for the `call_report` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `call_report` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `call_report_id` column on the `ticket` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `A` on the `_call_reportTolabel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_call_reportTolabel" DROP CONSTRAINT "_call_reportTolabel_A_fkey";

-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_call_report_id_fkey";

-- AlterTable
ALTER TABLE "_call_reportTolabel" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "call_report" DROP CONSTRAINT "call_report_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "call_report_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "call_report_id",
ADD COLUMN     "call_report_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "_call_reportTolabel_AB_unique" ON "_call_reportTolabel"("A", "B");

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_call_report_id_fkey" FOREIGN KEY ("call_report_id") REFERENCES "call_report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_call_reportTolabel" ADD CONSTRAINT "_call_reportTolabel_A_fkey" FOREIGN KEY ("A") REFERENCES "call_report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
