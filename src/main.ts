import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BlogSeederService } from './blogs/blog-seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('=== Environment Variables ===');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('PORT:', process.env.PORT);
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_PORT:', process.env.DB_PORT);
  console.log('DB_DATABASE:', process.env.DB_DATABASE);
  console.log('DB_USERNAME:', process.env.DB_USERNAME);
  console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***SET***' : 'NOT SET');
  console.log('==============================');

  
  // Seed the database on startup
  const seeder = app.get(BlogSeederService);
  await seeder.seed();
  
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
