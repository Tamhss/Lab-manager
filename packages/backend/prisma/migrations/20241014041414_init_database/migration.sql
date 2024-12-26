-- CreateEnum
CREATE TYPE "ERole" AS ENUM ('USER', 'OPERATOR', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "deleteFlag" BOOLEAN NOT NULL DEFAULT false,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hanId" SERIAL NOT NULL,
    "role" "ERole" DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Login" (
    "id" SERIAL NOT NULL,
    "syain_id" INTEGER NOT NULL,
    "user_id" VARCHAR(40) NOT NULL,
    "password" TEXT NOT NULL,
    "mail" VARCHAR(250),
    "mail_alert1_flag" BOOLEAN NOT NULL DEFAULT false,
    "mail_alert2_flag" BOOLEAN NOT NULL DEFAULT false,
    "syain_name" VARCHAR(250),
    "main_class" INTEGER,
    "force_change" BOOLEAN,
    "pass_husiyo_flag" BOOLEAN,

    CONSTRAINT "Login_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
