import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import type { MoviesListType } from '@/interfaces/movies';
import { moviesListTypesData, sortByData, SortByEnum } from '@/interfaces/movies';
import { PaginationParamsDto } from '@/interfaces/pagination.dto';

export class GetMoviesListDto extends PaginationParamsDto {
  @IsString({ message: 'Type must be a string' })
  @IsNotEmpty({ message: 'Type is required' })
  @IsIn(moviesListTypesData, {
    message: `Type must be one of the following: ${moviesListTypesData.join(', ')}`,
  })
  listType!: MoviesListType;
}

export class SearchMoviesDto {
  @IsOptional()
  @IsIn(sortByData, {
    message: `Sort by must be one of the following: ${sortByData.join(', ')}`,
  })
  @IsEnum(SortByEnum)
  sortBy?: SortByEnum;

  @IsOptional()
  @IsString()
  genres?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  page?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value))
  yearFrom?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value))
  yearTo?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value))
  ratingFrom?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value))
  ratingTo?: number;
}
