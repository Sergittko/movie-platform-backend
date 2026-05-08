import { Controller, Get, Query } from '@nestjs/common';

import { Public } from '@/common/decorators/public.decorator';
import { GetMoviesListDto, SearchMoviesDto } from '@/movies/dto/movies.dto';
import { MoviesService } from '@/movies/movies.service';

@Public()
@Controller('movies')
export class MoviesController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly moviesService: MoviesService) {}

  @Get('genres')
  getGenres() {
    return this.moviesService.getGenres();
  }

  @Get('list')
  getMovies(@Query() dto: GetMoviesListDto) {
    const page = dto.page ? Number(dto.page) : 1;

    return this.moviesService.getMovieList({
      ...dto,
      page,
    });
  }

  @Get('search')
  searchMovies(@Query() dto: SearchMoviesDto) {
    return this.moviesService.searchMovies(dto);
  }
}
