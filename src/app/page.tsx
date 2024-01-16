'use client';

import { Input } from '@material-tailwind/react';
import { Spinner } from '@material-tailwind/react';
import Head from 'next/head';
import React, { ChangeEvent, useCallback, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Podcast } from '@/lib/types';

import { PodcastCard } from '@/components/cards/PodcastCard';

import useDebounce from '@/app/hooks/useDebounce';
import usePodcasts from '@/app/hooks/usePodcasts';
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
  const limit = 6;

  const { podcasts, setSize, size } = usePodcasts(debouncedSearchQuery, limit);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSize(1);
  };

  const loadMorePodcasts = useCallback(() => {
    setSize(size + 1);
  }, [size, setSize]);

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
          dataLength={podcasts.length}
          next={loadMorePodcasts}
          loader={
            <div className='flex flex-col items-center justify-center mt-8 mb-8'>
              <Spinner />
            </div>
          }
          hasMore={true}
        >
          <div className='grid grid-cols-3 gap-4 mt-8 mb-8'>
            {podcasts &&
              podcasts.map((podcast: Podcast) => (
                <PodcastCard key={podcast.title} podcast={podcast} />
              ))}
          </div>
        </InfiniteScroll>
      </section>
    </main>
  );
}
