-- CreateTable
CREATE TABLE "Donators" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "network_name" VARCHAR(20) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "amount" VARCHAR(20) NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "Donators_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donators_hash_key" ON "Donators"("hash");
