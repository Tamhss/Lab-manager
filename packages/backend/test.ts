import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testQuery() {
  try {
    const lecturers = await prisma.user.findMany({
      where: { role: 'LECTURER' }, // Hoặc thử { role: Role.LECTURER }
    });

    console.log('Lecturers found:', lecturers);
  } catch (error) {
    console.error('Error:', error);
  }
}

testQuery();
