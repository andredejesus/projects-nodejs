-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(63) NOT NULL,
    "email" VARCHAR(127) NOT NULL,
    "password" VARCHAR(45) NOT NULL,
    "birthAt" DATE,
    "createdat" TIMESTAMP(6),
    "updatedat" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
