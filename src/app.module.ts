import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoomGateway } from './room/room.gateway';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule],
  providers: [AppService, RoomGateway],
})
export class AppModule {}
