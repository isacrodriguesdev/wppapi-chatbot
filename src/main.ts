import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "*",
    },
  });

  await app.listen(3000);
}
bootstrap();
