import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const createTableQuery = `
      CREATE TABLE pokemons (
        id SERIAL PRIMARY KEY,
        pokedex_number INTEGER,
        name VARCHAR(255),
        form_name VARCHAR(255),
        hp INTEGER,
        attack INTEGER,
        defense INTEGER,
        sp_attack INTEGER,
        sp_defense INTEGER,
        speed INTEGER,
        type1_id INTEGER,
        type2_id INTEGER
      );
    `;
    await sql.query(createTableQuery);
    return NextResponse.json({ message: 'Table "pokemons" created successfully.' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
