import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../src/common/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export default async function (prisma: PrismaService, configService: ConfigService) {
  const adminCredentials = {
    email: configService.getOrThrow('superAdminEmail'),
    password: configService.getOrThrow('superAdminPassword'),
  };

  const encryptedPassword = await bcrypt.hash(
    adminCredentials.password,
    configService.get('bcryptSaltRound') as number,
  );

  await prisma.admin.upsert({
    where: { email: adminCredentials.email },
    create: { email: adminCredentials.email, password: encryptedPassword },
    update: { email: adminCredentials.email, password: encryptedPassword },
  });
}
