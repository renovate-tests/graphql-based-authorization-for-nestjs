import {Injectable} from "@nestjs/common";
import {TypeOrmOptionsFactory, TypeOrmModuleOptions} from "@nestjs/typeorm";
import ormconfig from "./orm.config";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return ormconfig;
  }
}
