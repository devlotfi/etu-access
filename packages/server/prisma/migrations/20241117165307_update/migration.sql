/*
  Warnings:

  - You are about to drop the column `accessControlId` on the `Attendance` table. All the data in the column will be lost.
  - Added the required column `attendanceExportId` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_accessControlId_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "accessControlId",
ADD COLUMN     "attendanceExportId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AttendanceExport" (
    "id" TEXT NOT NULL,
    "accessControlId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AttendanceExport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_attendanceExportId_fkey" FOREIGN KEY ("attendanceExportId") REFERENCES "AttendanceExport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceExport" ADD CONSTRAINT "AttendanceExport_accessControlId_fkey" FOREIGN KEY ("accessControlId") REFERENCES "AccessControl"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
