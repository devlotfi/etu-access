/*
  Warnings:

  - You are about to drop the column `createdAt` on the `AccessControl` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AccessControl` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AccessControl" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
