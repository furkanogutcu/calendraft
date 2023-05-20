import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { Admin } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginPayload, RegisterPayload } from '../../../validations/admin/auth.validation';

export interface AccessTokenPayload {
  id: number;
  email: string;
}

export interface AccessTokenResponse {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async verifyCredentials({ email, password }: LoginPayload): Promise<Admin | void> {
    const admin = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) return;

    const passwordIsCorrect = await bcrypt.compare(password, admin.password);

    if (!passwordIsCorrect) return;

    return admin;
  }

  async login(admin: Admin): Promise<AccessTokenResponse> {
    const accessToken = await this.createJWT(admin);

    return {
      accessToken,
    };
  }

  async register({ email, password }: RegisterPayload): Promise<AccessTokenResponse> {
    const emailIsExist = await this.prisma.admin.findFirst({
      where: {
        email,
      },
    });

    if (emailIsExist) throw new ConflictException('Email already exists!');

    const encryptedPassword = await bcrypt.hash(password, this.configService.get('bcryptSaltRound') as number);

    const admin = await this.prisma.admin.create({
      data: {
        email,
        password: encryptedPassword,
      },
    });

    const accessToken = await this.createJWT(admin);

    return {
      accessToken,
    };
  }

  async getProfile({ id, email }: AccessTokenPayload): Promise<Omit<Admin, 'password'>> {
    const admin = await this.prisma.admin.findFirst({
      where: { id, email },
      select: { id: true, email: true, createdAt: true },
    });

    if (!admin) throw new NotFoundException('Admin not found!');

    return admin;
  }

  private async createJWT(admin: Admin): Promise<string> {
    const payload: AccessTokenPayload = {
      id: admin.id,
      email: admin.email,
    };

    return this.jwtService.sign(payload);
  }
}
