import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BlogSeederService } from './blogs/blog-seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Seed the database on startup
  const seeder = app.get(BlogSeederService);
  await seeder.seed();
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
