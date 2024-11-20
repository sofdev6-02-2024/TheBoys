import { Session } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { getIdToken } from '@/app/utils/sessionTokenAccessor';

export async function GET(): Promise<Response> {
  const session = (await getServerSession(authOptions)) as Session;

  if (session) {
    const idToken = await getIdToken();

    // if (!process.env.END_SESSION_URL || !process.env.NEXTAUTH_URL) {
    //   console.error('Required environment variables are not set');
    //   return new Response(null, { status: 500 });
    // }

    const url = `http://localhost:8080/realms/bodybost/protocol/openid-connect/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent('http://localhost:3000')}`;

    try {
      await fetch(url, { method: 'GET' });
    } catch (err) {
      console.error(err);
      return new Response(null, { status: 500 });
    }
  }

  return new Response(null, { status: 200 });
}