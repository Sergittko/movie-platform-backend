import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { PaginationParamsDto } from '@/interfaces/pagination.dto';

import { CreateMovieDto, ProfilePatchDataDto, UpdateMovieDto } from '../users/dto/users.dto';
import { UsersService } from '../users/users.service';

@Controller('users')
export class UsersController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  getUserProfile(@Param('userId') userId: string): Promise<any> {
    return this.usersService.getUserProfile(userId);
  }

  @Patch(':userId')
  updateProfile(
    @Param('userId') userId: string,
    @Body() updateProfileDto: ProfilePatchDataDto,
  ): Promise<any> {
    return this.usersService.updateProfile({ userId, updateProfileDto });
  }

  @Post(':userId/avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Param('userId') userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: any,
  ) {
    return this.usersService.uploadFile({ userId, file });
  }

  @Delete(':userId/avatar')
  deleteAvatarFile(@Param('userId') userId: string) {
    return this.usersService.deleteAvatarFile(userId);
  }

  @Get(':userId/watchlist')
  getWatchlist(@Param('userId') userId: string, @Query() dto: PaginationParamsDto) {
    return this.usersService.getWatchlist(userId, dto);
  }

  @Post(':userId/watchlist')
  addToWatchlist(@Param('userId') userId: string, @Body() dto: CreateMovieDto) {
    return this.usersService.addToWatchlist({ userId, dto });
  }

  @Patch(':userId/watchlist/:movieId')
  updateWatchlistMovie(
    @Param('userId') userId: string,
    @Param('movieId') movieId: string,
    @Body() dto: UpdateMovieDto,
  ) {
    return this.usersService.updateWatchlistMovie({
      userId,
      movieId,
      dto,
    });
  }

  @Delete(':userId/watchlist/:movieId')
  deleteWatchlistMovie(@Param('userId') userId: string, @Param('movieId') movieId: string) {
    return this.usersService.deleteWatchlistMovie({
      userId,
      movieId,
    });
  }

  @Get(':userId/watched')
  getWatchedMovies(@Param('userId') userId: string, @Query() dto: PaginationParamsDto) {
    return this.usersService.getWatchedMovies(userId, dto);
  }

  @Post(':userId/watched')
  addToWatched(@Param('userId') userId: string, @Body() dto: CreateMovieDto) {
    return this.usersService.addToWatched({ userId, dto });
  }

  @Patch(':userId/watched/:movieId')
  updateWatchedMovie(
    @Param('userId') userId: string,
    @Param('movieId') movieId: string,
    @Body() dto: UpdateMovieDto,
  ) {
    return this.usersService.updateWatchedMovie({
      userId,
      movieId,
      dto,
    });
  }

  @Delete(':userId/watched/:movieId')
  deleteWatchedMovie(@Param('userId') userId: string, @Param('movieId') movieId: string) {
    return this.usersService.deleteWatchedMovie({
      userId,
      movieId,
    });
  }

  @Get(':userId/watchlist/movie-ids')
  getWatchlistMovieIds(@Param('userId') userId: string) {
    return this.usersService.getWatchlistMovieIds(userId);
  }

  @Get(':userId/watched/movie-ids')
  getWatchedMovieIds(@Param('userId') userId: string) {
    return this.usersService.getWatchedMovieIds(userId);
  }
}
