export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  expiresAt: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  ipAddress?: string;
  userAgent?: string;
  userId: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  image?: string;
  callbackURL?: string;
  rememberMe?: boolean;
}

export interface SignInRequest {
  email: string;
  password: string;
  callbackURL?: string;
  rememberMe?: boolean;
}

export interface GetSessionResponse {
  session: Session;
  user: User;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  error?: string;
}
