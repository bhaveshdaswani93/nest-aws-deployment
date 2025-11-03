import { Controller, Get } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from './blog.entity';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  async findAll(): Promise<Blog[]> {
    return await this.blogsService.findAll();
  }
}
