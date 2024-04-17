import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { UsersModule } from './users/users.module';


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
        entities:[],
        synchronize: process.env.NODE_ENV === "development",
      }),
    }),
    ConfigModule.forRoot({
      isGlobal:true
    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
