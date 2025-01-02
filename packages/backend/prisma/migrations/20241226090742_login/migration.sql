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
