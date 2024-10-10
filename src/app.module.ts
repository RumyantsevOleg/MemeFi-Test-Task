import { Global, Module } from "@nestjs/common";

import { EvaluateModule } from "./modules/evaluate/evaluate.module";
import { ErrorService } from "./common/services/error.service";
import { CalculateModule } from "./modules/calculate/calculate.module";

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

    //Microservices
    CalculateModule,

    // App modules
    EvaluateModule,
  ],
})
export class AppModule {}
