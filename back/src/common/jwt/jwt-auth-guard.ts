import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()

/* The JwtAuthGuard class extends the AuthGuard class with the 'jwt' strategy for authentication. */
export class JwtAuthGuard extends AuthGuard('jwt') { }