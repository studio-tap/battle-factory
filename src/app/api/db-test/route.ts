import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const result = await sql`SELECT NOW();`;
    return NextResponse.json({ now: result.rows[0].now }, { status: 200 });
  } catch (error) {
    // エラーがErrorインスタンスか確認し、型安全性を確保
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      // その他のエラータイプの場合
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
