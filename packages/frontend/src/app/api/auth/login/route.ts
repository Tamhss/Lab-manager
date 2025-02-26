import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return new Response(JSON.stringify({ message: "Vui lòng nhập email và mật khẩu" }), { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return new Response(JSON.stringify({ message: "Tài khoản không tồn tại" }), { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new Response(JSON.stringify({ message: "Mật khẩu không đúng" }), { status: 401 });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "1h" });

        return new Response(JSON.stringify({ token, user: { id: user.id, name: user.name, email: user.email } }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Lỗi hệ thống" }), { status: 500 });
    }
}
