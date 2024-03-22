-- CreateEnum
CREATE TYPE "ticket_state" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "ticket" ADD COLUMN     "state" "ticket_state" NOT NULL DEFAULT 'OPEN';
