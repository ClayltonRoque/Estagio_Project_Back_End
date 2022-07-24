/*
  Warnings:

  - You are about to drop the `Coloborador_Login` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `login` to the `Coloborador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Coloborador` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Coloborador_Login";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "requester" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "solicitation" DATETIME NOT NULL,
    "end" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coloborador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "admission" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "type_blood" TEXT NOT NULL
);
INSERT INTO "new_Coloborador" ("admission", "id", "name", "role", "type_blood") SELECT "admission", "id", "name", "role", "type_blood" FROM "Coloborador";
DROP TABLE "Coloborador";
ALTER TABLE "new_Coloborador" RENAME TO "Coloborador";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
