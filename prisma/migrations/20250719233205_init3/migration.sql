/*
  Warnings:

  - Added the required column `region` to the `Story` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `Story` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
