/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class DatabaseModule
 */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permission, Role } from "../../src";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DBNAME,
            logging: process.env.DB_LOGGING === "true",
            entities: [
                Role,
                Permission
            ],
            dropSchema: process.env.DB_DROP === "true",
            synchronize: process.env.DB_SYNC === "true"
        })
    ]
})
export class DatabaseModule {}
