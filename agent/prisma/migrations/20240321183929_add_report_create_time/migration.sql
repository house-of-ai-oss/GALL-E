-- AlterTable
ALTER TABLE "call_report" ADD COLUMN     "create_time" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
