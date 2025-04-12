import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async listAll(): Promise<Omit<User, 'password_hash'>[]> {
    const users = await this.prisma.user.findMany({
      omit: {
        password_hash: true,
      },
    });
    return users;
  }

  async findById(id: number): Promise<Omit<User, 'password_hash'>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        addresses: true,
      },
      omit: {
        password_hash: true,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findByEmail(email: string): Promise<Omit<User, 'password_hash'>> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        addresses: true,
      },
      omit: {
        password_hash: true,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async delete(id: number): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async create(userData: CreateUserDto): Promise<Omit<User, 'password_hash'>> {
    const { name, email, password, addresses } = userData;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new HttpException('E-mail já cadastrado!', HttpStatus.CONFLICT);
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password_hash: await bcrypt.hash(password, 8),
        addresses: {
          createMany: {
            data: addresses ?? [],
          },
        },
      },
      include: {
        addresses: true,
      },
      omit: {
        password_hash: true,
      },
    });
    return user;
  }

  async checkUserPassword(email: string, password: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return false;
    }
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return false;
    }
    return true;
  }

  async update(
    id: number,
    userData: UpdateUserDto,
  ): Promise<Omit<User, 'password_hash'>> {
    const { name, email, password, addresses } = userData;
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    //Update addresses
    if (addresses && addresses?.length > 0) {
      await this.prisma.address.deleteMany({
        where: { userId: id },
      });
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password_hash: password
          ? await bcrypt.hash(password, 8)
          : existingUser.password_hash,
        addresses: {
          createMany: {
            data: addresses || [],
          },
        },
      },

      include: {
        addresses: true,
      },
      omit: {
        password_hash: true,
      },
    });
    return updatedUser;
  }
}
