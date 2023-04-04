import { User } from '../../user/user.entity';
import { Request } from 'express';

export default interface AuthRequest extends Request {
  user: User;
}