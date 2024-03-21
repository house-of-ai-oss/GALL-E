/*
  Warnings:

  - The primary key for the `ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ticket` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `A` on the `_ticketTouser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_ticketTouser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_ticketTouser" DROP CONSTRAINT "_ticketTouser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ticketTouser" DROP CONSTRAINT "_ticketTouser_B_fkey";

-- AlterTable
ALTER TABLE "_ticketTouser" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ticket_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "_ticketTouser_AB_unique" ON "_ticketTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_ticketTouser_B_index" ON "_ticketTouser"("B");

-- AddForeignKey
ALTER TABLE "_ticketTouser" ADD CONSTRAINT "_ticketTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ticketTouser" ADD CONSTRAINT "_ticketTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
