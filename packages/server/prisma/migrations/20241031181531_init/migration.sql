-- CreateEnum
CREATE TYPE "AccessRuleType" AS ENUM ('SPECIALITY', 'SECTION', 'DIRECTED_WORK_GROUP', 'PRACTICAL_WORK_GROUP');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speciality" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Speciality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "specialityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DirectedWorkGroup" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DirectedWorkGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PracticalWorksGroup" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PracticalWorksGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "directedWorkGroupId" TEXT NOT NULL,
    "practicalWorkGroupId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "registration" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessControl" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AccessControl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessHistory" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "accessControlId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccessHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessRule" (
    "id" TEXT NOT NULL,
    "accessControlId" TEXT NOT NULL,
    "type" "AccessRuleType" NOT NULL,

    CONSTRAINT "AccessRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_registration_key" ON "Student"("registration");

-- CreateIndex
CREATE UNIQUE INDEX "AccessControl_userId_name_key" ON "AccessControl"("userId", "name");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_specialityId_fkey" FOREIGN KEY ("specialityId") REFERENCES "Speciality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectedWorkGroup" ADD CONSTRAINT "DirectedWorkGroup_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticalWorksGroup" ADD CONSTRAINT "PracticalWorksGroup_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_directedWorkGroupId_fkey" FOREIGN KEY ("directedWorkGroupId") REFERENCES "DirectedWorkGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_practicalWorkGroupId_fkey" FOREIGN KEY ("practicalWorkGroupId") REFERENCES "PracticalWorksGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessHistory" ADD CONSTRAINT "AccessHistory_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessHistory" ADD CONSTRAINT "AccessHistory_accessControlId_fkey" FOREIGN KEY ("accessControlId") REFERENCES "AccessControl"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessRule" ADD CONSTRAINT "AccessRule_accessControlId_fkey" FOREIGN KEY ("accessControlId") REFERENCES "AccessControl"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
