/*
  Warnings:

  - A unique constraint covering the columns `[movieId,profileId]` on the table `WatchedMovie` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[movieId,profileId]` on the table `WatchlistMovie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WatchedMovie_movieId_profileId_key" ON "WatchedMovie"("movieId", "profileId");

-- CreateIndex
CREATE UNIQUE INDEX "WatchlistMovie_movieId_profileId_key" ON "WatchlistMovie"("movieId", "profileId");
