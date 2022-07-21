/*
  Warnings:

  - You are about to drop the column `coloboradorId` on the `Coloborador` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coloborador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "admission" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "type_blood" TEXT NOT NULL
);
INSERT INTO "new_Coloborador" ("admission", "id", "role", "type_blood") SELECT "admission", "id", "role", "type_blood" FROM "Coloborador";
DROP TABLE "Coloborador";
ALTER TABLE "new_Coloborador" RENAME TO "Coloborador";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
