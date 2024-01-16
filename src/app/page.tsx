'use client';

import { Input } from '@material-tailwind/react';
import { Spinner } from '@material-tailwind/react';
import Head from 'next/head';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Podcast } from '@/lib/types';

import { PodcastCard } from '@/components/cards/PodcastCard';

import { useGetPodcastsQuery } from '@/app/graphql/generated-gql';
import useDebounce from '@/app/hooks/useDebounce';
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce<string>(searchQuery, 500);
  const [page, setPage] = useState<number>(1);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const limit = 6;

  const [result] = useGetPodcastsQuery({
    variables: {
      page,
      limit,
      search: debouncedSearchQuery,
    },
  });

  useEffect(() => {
    if (result.data?.podcasts) {
      const data = result.data?.podcasts as Podcast[];
      setPodcasts((podcasts) => [...podcasts, ...data]);

      if (result.data?.podcasts.length === limit) {
        setHasMoreData(true);
      } else {
        setHasMoreData(false);
      }
    }
  }, [result.data]);

  useEffect(() => {
    setPodcasts([]);
  }, [debouncedSearchQuery]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const loadMorePodcasts = useCallback(() => {
    setPage(page + 1);
  }, [page, setPage]);

  return (
    <main>
      <Head>
        <title>Podcasts</title>
      </Head>
      <section className='bg-white flex flex-col items-center justify-center'>
        <div className='w-72 mt-8'>
          <Input
            label='Search'
            crossOrigin=''
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>
        <InfiniteScroll
          dataLength={podcasts?.length ?? 0}
          next={loadMorePodcasts}
          loader={
            <div className='flex flex-col items-center justify-center mt-8 mb-8'>
              <Spinner />
            </div>
          }
          hasMore={hasMoreData}
        >
          <div className='grid grid-cols-3 gap-4 mt-8 mb-8'>
            {podcasts &&
              podcasts.map((podcast: Podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
              ))}
          </div>
        </InfiniteScroll>
      </section>
    </main>
  );
}
