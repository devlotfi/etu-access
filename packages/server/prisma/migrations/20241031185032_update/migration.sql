/*
  Warnings:

  - You are about to drop the `AccessHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AccessHistory" DROP CONSTRAINT "AccessHistory_accessControlId_fkey";

-- DropForeignKey
ALTER TABLE "AccessHistory" DROP CONSTRAINT "AccessHistory_studentId_fkey";

-- DropTable
DROP TABLE "AccessHistory";

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "accessControlId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_accessControlId_fkey" FOREIGN KEY ("accessControlId") REFERENCES "AccessControl"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
