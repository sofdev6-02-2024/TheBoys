'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signIn('keycloak');
      }}
    >
      <button type="submit">Signin with Keycloak</button>
    </form>
  );
}
