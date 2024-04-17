import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { UsersModule } from './users/users.module';
import { User } from './users/entities';
import { ErrorHandlerModule } from './error-handler/error-handler.module';



@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: undefined,
			useFactory: (): TypeOrmModuleOptions => ({
				type: "postgres",
				host: process.env.DB_HOST,
				port: +(process.env.DB_PORT as string),
				username: process.env.DB_USERNAME,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
        entities:[
          User,
        ],
        synchronize: true,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal:true
    }),
    UsersModule,
    ErrorHandlerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
