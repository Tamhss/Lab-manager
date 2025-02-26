import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("123456", 10);

    await prisma.user.create({
        data: {
            email: "admin@example.com",
            password: hashedPassword,
            userName: "ADMIN",
            role: "ADMIN"
        },
    });

    console.log("User đã được tạo!");
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
