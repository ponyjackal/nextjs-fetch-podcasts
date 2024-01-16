'use client';

import * as React from 'react';
import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  Provider as URQLProvider,
} from 'urql';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { apiBaseURL } from '@/constant/env';
const client = createClient({
  url: `${apiBaseURL}/graphql`,
  requestPolicy: 'network-only',
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <URQLProvider value={client}>
      <html>
        <body>{children}</body>
      </html>
    </URQLProvider>
  );
}
