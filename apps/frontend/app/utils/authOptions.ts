import { DefaultSession, Account, AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { jwtDecode } from 'jwt-decode';
import { encrypt } from '@/app/utils/encryption';

interface DecodedToken {
    realm_access: {
      roles: string[];
    };
  }
  
  interface Token extends JWT {
    decoded?: DecodedToken;
    access_token?: string;
    id_token?: string;
    expires_at?: number;
    refresh_token?: string;
    error?: string;
  }
  
  interface RefreshTokenResponse {
    access_token: string;
    id_token: string;
    expires_in: number;
    refresh_token: string;
  }
  
  interface CustomSession extends DefaultSession {
    access_token?: string;
    id_token?: string;
    roles?: string[];
    error?: string;
  }
  
  async function refreshAccessToken(token: Token): Promise<Token> {
    const resp = await fetch(`http://172.17.0.1:8080/realms/bodybost/protocol/openid-connect/token`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: 'nextjs',
        client_secret: '**********',
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token!,
      }),
      method: 'POST',
    });
  
    const refreshToken: RefreshTokenResponse = await resp.json();
    if (!resp.ok) throw refreshToken;
  
    return {
      ...token,
      access_token: refreshToken.access_token,
      decoded: jwtDecode(refreshToken.access_token),
      id_token: refreshToken.id_token,
      expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
      refresh_token: refreshToken.refresh_token,
    };
  }
  
  export const authOptions: AuthOptions = {
    providers: [
      KeycloakProvider({
        clientId: `nextjs`,
        clientSecret: `**********`,
        issuer: `http://172.17.0.1:8080/realms/body-boost/`,
      }),
    ],
    callbacks: {
  
      async jwt({ token, account }: { token: Token; account: Account | null }) {
        const nowTimeStamp = Math.floor(Date.now() / 1000);
  
        if (account) {
          token.decoded = jwtDecode(account.access_token!);
          token.access_token = account.access_token;
          token.id_token = account.id_token;
          token.expires_at = account.expires_at;
          token.refresh_token = account.refresh_token;
          return token;
        } else if (token.expires_at && nowTimeStamp < token.expires_at) {
          return token;
        } else {
          console.log('Token has expired. Will refresh...');
          try {
            const refreshedToken = await refreshAccessToken(token);
            console.log('Token is refreshed.');
            return refreshedToken;
          } catch (error) {
            console.error('Error refreshing access token', error);
            return { ...token, error: 'RefreshAccessTokenError' };
          }
        }
      },
      async session({
        session,
        token,
      }: {
        session: CustomSession;
        token: Token;
      }) {
        if (token.access_token) {
          session.access_token = encrypt(token.access_token);
        }
        if (token.id_token) {
          session.id_token = encrypt(token.id_token);
        }
        if (token.decoded) {
          session.roles = token.decoded.realm_access.roles;
        }
        session.error = token.error;
        return session;
      },
    },
};
