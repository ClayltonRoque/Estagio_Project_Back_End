/*
  Warnings:

  - You are about to drop the column `senha` on the `Coloborador` table. All the data in the column will be lost.
  - Added the required column `password` to the `Coloborador` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coloborador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admission" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "type_blood" TEXT NOT NULL
);
INSERT INTO "new_Coloborador" ("admission", "id", "login", "name", "role", "type_blood") SELECT "admission", "id", "login", "name", "role", "type_blood" FROM "Coloborador";
DROP TABLE "Coloborador";
ALTER TABLE "new_Coloborador" RENAME TO "Coloborador";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
