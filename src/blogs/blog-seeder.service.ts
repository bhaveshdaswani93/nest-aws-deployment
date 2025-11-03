import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogSeederService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}

  async seed() {
    const count = await this.blogsRepository.count();
    
    if (count > 0) {
      console.log('Blogs already seeded, skipping...');
      return;
    }

    const blogs = [
      {
        title: 'Getting Started with NestJS',
        content: 'NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It uses TypeScript by default and combines elements of OOP, FP, and FRP.',
        author: 'John Doe',
      },
      {
        title: 'Understanding TypeORM',
        content: 'TypeORM is an ORM that can run in NodeJS and can be used with TypeScript and JavaScript. It supports many databases including MySQL, PostgreSQL, and SQLite.',
        author: 'Jane Smith',
      },
      {
        title: 'Building RESTful APIs',
        content: 'REST APIs are the backbone of modern web applications. They provide a standardized way for clients to communicate with servers using HTTP methods.',
        author: 'Mike Johnson',
      },
      {
        title: 'Database Design Best Practices',
        content: 'Good database design is crucial for application performance. Key principles include normalization, proper indexing, and understanding relationships between entities.',
        author: 'Sarah Williams',
      },
      {
        title: 'Async/Await in Node.js',
        content: 'Async/await is a modern way to handle asynchronous operations in JavaScript. It makes asynchronous code look and behave more like synchronous code.',
        author: 'David Brown',
      },
      {
        title: 'Testing NestJS Applications',
        content: 'Testing is essential for maintaining code quality. NestJS provides built-in support for unit testing and e2e testing using Jest.',
        author: 'Emily Davis',
      },
      {
        title: 'Deploying Node.js Apps to AWS',
        content: 'AWS offers multiple services for deploying Node.js applications, including EC2, Lambda, and Elastic Beanstalk. Each has its own advantages depending on your use case.',
        author: 'Robert Wilson',
      },
      {
        title: 'Advanced TypeScript Patterns',
        content: 'TypeScript provides powerful features like generics, decorators, and advanced types that can help you write more maintainable and type-safe code.',
        author: 'Lisa Anderson',
      },
    ];

    await this.blogsRepository.save(blogs);
    console.log(`Successfully seeded ${blogs.length} blogs!`);
  }
}
