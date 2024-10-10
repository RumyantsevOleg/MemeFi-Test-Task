import { Global, Module } from "@nestjs/common";

import { EvaluateModule } from "./modules/evaluate/evaluate.module";
import { ErrorService } from "./common/services/error.service";

// Global module
@Global()
@Module({
  providers: [ErrorService],
  exports: [ErrorService],
})
class GlobalModule {}

// App module
@Module({
  imports: [
    // System modules
    GlobalModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),

    // App modules
    EvaluateModule,
  ],
})
export class AppModule {}
