-- CreateTable
CREATE TABLE "label" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_call_reportTolabel" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "label_name_key" ON "label"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_call_reportTolabel_AB_unique" ON "_call_reportTolabel"("A", "B");

-- CreateIndex
CREATE INDEX "_call_reportTolabel_B_index" ON "_call_reportTolabel"("B");

-- AddForeignKey
ALTER TABLE "_call_reportTolabel" ADD CONSTRAINT "_call_reportTolabel_A_fkey" FOREIGN KEY ("A") REFERENCES "call_report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_call_reportTolabel" ADD CONSTRAINT "_call_reportTolabel_B_fkey" FOREIGN KEY ("B") REFERENCES "label"("id") ON DELETE CASCADE ON UPDATE CASCADE;
