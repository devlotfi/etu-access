/*
  Warnings:

  - You are about to drop the column `directedWorkGroupId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `practicalWorkGroupId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `sectionId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `AccessRule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DirectedWorkGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PracticalWorksGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Speciality` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `directedWorkGroup` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `practicalWorkGroup` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speciality` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AccessRule" DROP CONSTRAINT "AccessRule_accessControlId_fkey";

-- DropForeignKey
ALTER TABLE "DirectedWorkGroup" DROP CONSTRAINT "DirectedWorkGroup_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "PracticalWorksGroup" DROP CONSTRAINT "PracticalWorksGroup_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_specialityId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_directedWorkGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_practicalWorkGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_sectionId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "directedWorkGroupId",
DROP COLUMN "practicalWorkGroupId",
DROP COLUMN "sectionId",
ADD COLUMN     "directedWorkGroup" TEXT NOT NULL,
ADD COLUMN     "practicalWorkGroup" TEXT NOT NULL,
ADD COLUMN     "section" TEXT NOT NULL,
ADD COLUMN     "speciality" TEXT NOT NULL;

-- DropTable
DROP TABLE "AccessRule";

-- DropTable
DROP TABLE "DirectedWorkGroup";

-- DropTable
DROP TABLE "PracticalWorksGroup";

-- DropTable
DROP TABLE "Section";

-- DropTable
DROP TABLE "Speciality";

-- DropEnum
DROP TYPE "AccessRuleType";
