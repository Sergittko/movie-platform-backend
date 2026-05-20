import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { handleCatchError } from '@/helpers/handle-catch-error';
import { PaginationParamsDto } from '@/interfaces/pagination.dto';

import { Supabase } from '../auth/supabase/supabase';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto, ProfilePatchDataDto, UpdateMovieDto } from '../users/dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabase: Supabase,
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async getUserProfile(userId: string): Promise<any> {
    try {
      const profile = await this.prisma.profile.findUnique({
        where: { userId: userId },
      });

      if (!profile) {
        throw new Error('Profile not found');
      }

      return { data: { profile } };
    } catch (error) {
      handleCatchError(error, InternalServerErrorException);
    }
  }

  public async updateProfile({
    userId,
    updateProfileDto,
  }: {
    userId: string;
    updateProfileDto: ProfilePatchDataDto;
  }): Promise<any> {
    try {
      // Find existing profile
      const profile = await this.prisma.profile.findUnique({
        where: { userId: userId },
      });

      if (!profile) {
        throw new Error('Profile not found');
      }

      // Update the profile with the new data
      const updatedProfile = await this.prisma.profile.update({
        where: { userId: userId },
        data: {
          ...updateProfileDto,
        },
      });

      return { data: { profile: updatedProfile } };
    } catch (error) {
      handleCatchError(error, InternalServerErrorException);
    }
  }

  public async uploadFile({
    file,
    userId,
  }: {
    file: Express.Multer.File;
    userId: string;
  }): Promise<any> {
    try {
      const supabaseClient = this.supabase.getClient();

      const profile = await this.prisma.profile.findUnique({
        where: { userId },
      });

      // Remove avatar from storage before update, if exsists
      if (profile?.avatar) {
        const regex = /avatars\/([^/?]+)/;
        const match = profile.avatar.match(regex);

        if (match) {
          const { error: deleteError } = await supabaseClient.storage
            .from('avatars')
            .remove([match[1]]);

          if (deleteError) {
            throw new Error(`Error removing old avatar: ${deleteError.message}`);
          }
        }
      }

      // Upload the new file
      const { data, error } = await supabaseClient.storage
        .from('avatars')
        .upload(`avatar_${Date.now()}.png`, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (error) {
        throw new Error(error.message);
      }

      // Get the signed URL for the new avatar
      const { data: urlAvatarData, error: imageError } = await supabaseClient.storage
        .from('avatars')
        .createSignedUrl(data.path, 60 * 60 * 24 * 365 * 5);

      if (imageError) {
        throw new Error(imageError.message);
      }

      // Update the profile with the new avatar URL
      await this.prisma.profile.update({
        where: { userId },
        data: { avatar: urlAvatarData.signedUrl },
      });

      return {
        data: {
          avatarUrl: urlAvatarData.signedUrl,
        },
        message: 'Avatar uploaded successfully!',
      };
    } catch (error) {
      handleCatchError(error, InternalServerErrorException);
    }
  }

  public async deleteAvatarFile(userId: string): Promise<any> {
    try {
      const supabaseClient = this.supabase.getClient();
      const profile = await this.prisma.profile.findUnique({
        where: { userId },
      });

      if (profile?.avatar) {
        const regex = /avatars\/([^/?]+)/;
        const match = profile.avatar.match(regex);

        await this.prisma.profile.update({
          where: { userId },
          data: { avatar: null },
        });

        if (match) {
          await supabaseClient.storage.from('avatars').remove([match[1]]);
        }
      }

      return {
        message: 'Avatar deleted successfully!',
      };
    } catch (error) {
      handleCatchError(error, InternalServerErrorException);
    }
  }

  public async getWatchlist(userId: string, dto: PaginationParamsDto) {
    const { page = 1, limit = 10 } = dto;

    try {
      const profile = await this.prisma.profile.findUnique({
        where: { userId },
      });

      if (!profile) {
        throw new Error('Profile not found');
      }

      const skip = (+page - 1) * +limit;

      const [movies, totalResults] = await Promise.all([
        this.prisma.watchlistMovie.findMany({
          where: {
            profileId: profile.id,
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip,
          take: +limit,
        }),

        this.prisma.watchlistMovie.count({
          where: {
            profileId: profile.id,
          },
        }),
      ]);

      return {
        data: {
          movies,
        },
        page,
        limit,
        totalResults,
        totalPages: Math.ceil(totalResults / limit),
      };
    } catch (error) {
      handleCatchError(error, InternalServerErrorException);
    }
  }

  public async addToWatchlist({ userId, dto }: { userId: string; dto: CreateMovieDto }) {
    try {
      const profile = await this.prisma.profile.findUnique({
        where: { userId },
      });

      if (!profile) {
        throw new Error('Profile not found');
      }

      const movie = await this.prisma.watchlistMovie.create({
        data: {
          movieId: dto.movieId,
          title: dto.title,
          image: dto.image,
          profileId: profile.id,
        },
      });

      return {
        data: {
          movie,
        },
      };
    } catch (error) {
      handleCatchError(error, InternalServerErrorException);
    }
  }

  public async updateWatchlistMovie({
    userId,
    movieId,
    dto,
  }: {
    userId: string;
    movieId: string;
    dto: UpdateMovieDto;
  }) {
    try {
      const profile = await this.prisma.profile.findUnique({
        where: { userId },
      });

      if (!profile) {
        throw new Error('Profile not found');
      }

      const movie = await this.prisma.watchlistMovie.update({
        where: {
          id: movieId,
        },
        data: dto,
      });

      return {
        data: {
          movie,
        },
      };
    } catch (error) {
      handleCatchError(error, InternalServerErrorException);
    }
  }

  public async deleteWatchlistMovie({ userId, movieId }: { userId: string; movieId: string }) {
    try {
      const profile = await this.prisma.profile.findUnique({
        where: { userId },
      });

      if (!profile) {
        throw new Error('Profile not found');
      }

      await this.prisma.watchlistMovie.delete({
        where: {
          movieId_profileId: {
            movieId,
            profileId: profile.id,
          },
        },
      });

      return {
        message: 'Movie removed from watchlist',
      };
    } catch (error) {
      handleCatchError(error, InternalServerErrorException);
    }
  }

  public async getWatchedMovies(userId: string, dto: PaginationParamsDto) {
    const { page = 1, limit = 10 } = dto;

    try {
      const profile = await this.prisma.profile.findUnique({
        where: { userId },
      });

      if (!profile) {
        throw new Error('Profile not found');
      }

      const skip = (page - 1) * limit;

      const [movies, totalResults] = await Promise.all([
        this.prisma.watchedMovie.findMany({
          where: {
            profileId: profile.id,
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip,
          take: limit,
        }),

        this.prisma.watchedMovie.count({
          where: {
            profileId: profile.id,
          },
        }),
      ]);

      return {
        data: {
          movies,
        },
        page,
        limit,
        totalResults,
        totalPages: Math.ceil(totalResults / limit),
      };
    } catch (error) {
      handleCatchError(error, InternalServerErrorException);
    }
  }

  public async addToWatched({ userId, dto }: { userId: string; dto: CreateMovieDto }) {
    try {
      const profile = await this.prisma.profile.findUnique({
        where: { userId },
      });

      if (!profile) {
        throw new Error('Profile not found');
      }

      const movie = await this.prisma.watchedMovie.create({
        data: {
          movieId: dto.movieId,
          title: dto.title,
          image: dto.image,
          profileId: profile.id,
        },
      });

      return {
        data: {
          movie,
        },
      };
    } catch (error) {
      handleCatchError(error, InternalServerErrorException);
    }
  }

  public async updateWatchedMovie({
    userId,
    movieId,
    dto,
  }: {
    userId: string;
    movieId: string;
    dto: UpdateMovieDto;
  }) {
    try {
      const profile = await this.prisma.profile.findUnique({
        where: { userId },
      });

      if (!profile) {
        throw new Error('Profile not found');
      }

      const movie = await this.prisma.watchedMovie.update({
        where: {
          id: movieId,
        },
        data: dto,
      });

      return {
        data: {
          movie,
        },
      };
    } catch (error) {
      handleCatchError(error, InternalServerErrorException);
    }
  }

  public async deleteWatchedMovie({ userId, movieId }: { userId: string; movieId: string }) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Profile not found');
    }

    try {
      await this.prisma.watchedMovie.delete({
        where: {
          movieId_profileId: {
            movieId,
            profileId: profile.id,
          },
        },
      });

      return {
        message: 'Movie removed from watched',
      };
    } catch (error) {
      handleCatchError(error, InternalServerErrorException);
    }
  }

  public async getWatchlistMovieIds(userId: string) {
    try {
      const profile = await this.prisma.profile.findUnique({
        where: { userId },
        include: {
          watchlistMovies: {
            select: {
              movieId: true,
            },
          },
        },
      });

      return {
        data: {
          movieIds: profile?.watchlistMovies.map((movie) => movie.movieId) || [],
        },
      };
    } catch (error) {
      handleCatchError(error, InternalServerErrorException);
    }
  }

  public async getWatchedMovieIds(userId: string) {
    try {
      const profile = await this.prisma.profile.findUnique({
        where: { userId },
        include: {
          watchedMovies: {
            select: {
              movieId: true,
            },
          },
        },
      });

      return {
        data: {
          movieIds: profile?.watchedMovies.map((movie) => movie.movieId) || [],
        },
      };
    } catch (error) {
      handleCatchError(error, InternalServerErrorException);
    }
  }
}
