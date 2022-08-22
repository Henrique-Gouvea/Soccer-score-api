import { sign } from 'jsonwebtoken';
import 'dotenv/config';
import { IToken } from '../interfaces/IToken';

class tokenProvider implements IToken {
  private jwtSecret: string;
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'hardPassword';
  }

  generateToken(email: string): string {
    const token = sign({ data: email }, this.jwtSecret, {
      expiresIn: '5d',
      algorithm: 'HS256',
    });
    console.log(token);

    return token;
  }
}

export default tokenProvider;
