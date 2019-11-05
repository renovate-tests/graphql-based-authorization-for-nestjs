import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {GraphQLModule} from "@nestjs/graphql";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user.module";
import ormconfig from "./ormconfig";


@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        debug: process.env.NODE_ENV !== "production",
        playground: process.env.NODE_ENV !== "production",
        context: ({req}): {req: Request} => ({req}),
        autoSchemaFile: "./schema.gql",
      }),
    }),
    AuthModule,
    UserModule,
  ],
})
export class ApplicationModule {}
