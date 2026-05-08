import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { MoviesController } from '@/movies/movies.controller';
import { MoviesService } from '@/movies/movies.service';

@Module({
  imports: [HttpModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
// eslint-disable-next-line prettier/prettier
export class MoviesModule {}
