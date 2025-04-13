import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { LibraryController } from './library.controller';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [LibraryService, UsersService, PrismaService],
  controllers: [LibraryController],
  imports: [UsersModule, PrismaModule],
  exports: [UsersService],
})
export class LibraryModule {}
