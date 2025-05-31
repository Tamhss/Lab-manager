"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    const hashedPassword = await bcryptjs_1.default.hash("123456", 10);
    await prisma.user.create({
        data: {
            email: "admin@example.com",
            password: hashedPassword,
            userName: "ADMIN",
            role: "ADMIN",
            code: "123454"
        },
    });
    console.log("User đã được tạo!");
}
main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map