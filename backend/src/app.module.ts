import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { GamesModule } from './modules/games/games.module';
import { LibraryController } from './modules/library/library.controller';
import { LibraryService } from './modules/library/library.service';
import { LibraryModule } from './modules/library/library.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    GamesModule,
    LibraryModule,
  ],
  controllers: [AppController, LibraryController],
  providers: [AppService, LibraryService],
})
export class AppModule {}
