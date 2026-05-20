import { AuthenticatedUser } from '@/interfaces/auth';

export type RequestWithUser = Request & {
  user: AuthenticatedUser;
};
