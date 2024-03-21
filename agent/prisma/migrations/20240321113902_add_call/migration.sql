-- CreateTable
CREATE TABLE "call_report" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "call_report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "call_report" ADD CONSTRAINT "call_report_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
