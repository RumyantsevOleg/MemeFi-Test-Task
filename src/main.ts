// Todo make a separate file for env and config module/service
import * as dotenv from "dotenv";
dotenv.config();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule } from "@nestjs/swagger";
import { NestiaSwaggerComposer } from "@nestia/sdk";

const PORT = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Todo move it into a separate file
  const document = await NestiaSwaggerComposer.document(app, {
    servers: [
      {
        url: "http://localhost:8080",
        description: "Local server",
      },
    ],
  });
  SwaggerModule.setup("/", app, document as any);

  await app.listen(PORT);
}

bootstrap().then(() => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
