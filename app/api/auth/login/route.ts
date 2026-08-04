import { NextRequest, NextResponse } from 'next/server';
import { setCookie } from '@/lib/cookies';
import { authApi } from '@/features/account/infrastructure/auth-api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await authApi.login(body);
    
    // Set HttpOnly cookie with token
    const res = NextResponse.json({ usuario: response.usuario });
    res.cookies.set('auth_token', response.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    
    return res;
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao fazer login' },
      { status: 401 }
    );
  }
}
