import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { Blog } from './blog.entity';
import { BlogSeederService } from './blog-seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog])],
  controllers: [BlogsController],
  providers: [BlogsService, BlogSeederService],
  exports: [BlogsService, BlogSeederService],
})
export class BlogsModule {}
