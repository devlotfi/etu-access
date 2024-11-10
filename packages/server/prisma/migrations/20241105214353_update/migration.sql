/*
  Warnings:

  - A unique constraint covering the columns `[cardId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cardId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccessControl" ADD COLUMN     "open" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "cardId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_cardId_key" ON "Student"("cardId");
