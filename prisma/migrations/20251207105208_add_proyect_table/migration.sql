-- CreateTable
CREATE TABLE "proyect" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "proyect_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "proyect_userId_idx" ON "proyect"("userId");

-- AddForeignKey
ALTER TABLE "proyect" ADD CONSTRAINT "proyect_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
