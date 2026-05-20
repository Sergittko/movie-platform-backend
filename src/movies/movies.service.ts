import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { MoviesListTypesEnum, SortByEnum } from '@/interfaces/movies';
import { GetMoviesListDto, SearchMovieByNameDto, SearchMoviesDto } from '@/movies/dto/movies.dto';

@Injectable()
export class MoviesService {
  private readonly baseUrl = process.env.TMDB_BASE_URL;
  private readonly apiKey = process.env.TMDB_API_KEY;

  // eslint-disable-next-line prettier/prettier
  constructor(private readonly httpService: HttpService) {}

  async getMovieList({ listType, page }: GetMoviesListDto) {
    const isUpcoming = listType === MoviesListTypesEnum.UPCOMING;

    const url = isUpcoming ? `${this.baseUrl}/discover/movie` : `${this.baseUrl}/movie/${listType}`;

    const params: any = {
      api_key: this.apiKey,
      page,
      language: 'en-US',
      include_adult: false,
    };

    if (isUpcoming) {
      const today = new Date();

      const from = today.toISOString().split('T')[0];

      const toDate = new Date(today);
      toDate.setMonth(toDate.getMonth() + 1);

      const to = toDate.toISOString().split('T')[0];

      params.sort_by = 'popularity.desc';

      params['primary_release_date.gte'] = from;
      params['primary_release_date.lte'] = to;
    }

    const { data } = await firstValueFrom(this.httpService.get(url, { params }));

    return {
      data: {
        movies: data.results,
      },
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
    };
  }

  async getGenres() {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/genre/movie/list`, {
        params: {
          api_key: this.apiKey,
          language: 'en-US',
        },
      }),
    );

    return {
      genres: data.genres,
    };
  }

  async searchMovies(dto: SearchMoviesDto) {
    const {
      sortBy = SortByEnum.POPULARITY,
      genres,
      page = 1,
      yearFrom,
      yearTo,
      ratingFrom,
      ratingTo,
    } = dto;

    const params: any = {
      api_key: this.apiKey,
      language: 'en-US',
      page,
      sort_by: sortBy,
      include_adult: false,
    };

    if (genres) {
      params.with_genres = genres;
    }

    if (yearFrom) {
      params['primary_release_date.gte'] = `${yearFrom}-01-01`;
    }

    if (yearTo) {
      params['primary_release_date.lte'] = `${yearTo}-12-31`;
    }

    if (ratingFrom !== undefined) {
      params['vote_average.gte'] = ratingFrom;
    }

    if (ratingTo !== undefined) {
      params['vote_average.lte'] = ratingTo;
    }

    const { data } = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/discover/movie`, {
        params,
      }),
    );

    return {
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      results: data.results,
    };
  }

  async searchMoviesByName(dto: SearchMovieByNameDto) {
    const { query, page = 1 } = dto;

    const { data } = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/search/movie`, {
        params: {
          api_key: this.apiKey,
          language: 'en-US',
          query,
          page,
          include_adult: false,
        },
      }),
    );

    return {
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      results: data.results,
    };
  }
}
