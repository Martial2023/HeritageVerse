/*
  Warnings:

  - Added the required column `author` to the `Story` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorEmail` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "authorEmail" TEXT NOT NULL;
