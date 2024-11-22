-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_attendanceExportId_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_studentId_fkey";

-- DropForeignKey
ALTER TABLE "AttendanceExport" DROP CONSTRAINT "AttendanceExport_accessControlId_fkey";

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_attendanceExportId_fkey" FOREIGN KEY ("attendanceExportId") REFERENCES "AttendanceExport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceExport" ADD CONSTRAINT "AttendanceExport_accessControlId_fkey" FOREIGN KEY ("accessControlId") REFERENCES "AccessControl"("id") ON DELETE CASCADE ON UPDATE CASCADE;
