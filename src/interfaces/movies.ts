export enum MoviesListTypesEnum {
  POPULAR = 'popular',
  TOP_RATED = 'top_rated',
  NOW_PLAYING = 'now_playing',
  UPCOMING = 'upcoming',
}

export type MoviesListType =
  | MoviesListTypesEnum.POPULAR
  | MoviesListTypesEnum.TOP_RATED
  | MoviesListTypesEnum.NOW_PLAYING
  | MoviesListTypesEnum.UPCOMING;

export const moviesListTypesData: MoviesListType[] = [
  MoviesListTypesEnum.POPULAR,
  MoviesListTypesEnum.TOP_RATED,
  MoviesListTypesEnum.NOW_PLAYING,
  MoviesListTypesEnum.UPCOMING,
];

export enum SortByEnum {
  POPULARITY = 'popularity.desc',
  RATING = 'vote_average.desc',
  NEWEST = 'primary_release_date.desc',
  OLDEST = 'primary_release_date.asc',
  TITLE_ASC = 'original_title.asc',
  TITLE_DESC = 'original_title.desc',
}

export type SortByType =
  | SortByEnum.POPULARITY
  | SortByEnum.RATING
  | SortByEnum.NEWEST
  | SortByEnum.OLDEST
  | SortByEnum.TITLE_ASC
  | SortByEnum.TITLE_DESC;

export const sortByData: SortByType[] = [
  SortByEnum.POPULARITY,
  SortByEnum.RATING,
  SortByEnum.NEWEST,
  SortByEnum.OLDEST,
  SortByEnum.TITLE_ASC,
  SortByEnum.TITLE_DESC,
];
