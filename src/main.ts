import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "*",
    },
  });
  await app.listen(4000);
}
bootstrap();
