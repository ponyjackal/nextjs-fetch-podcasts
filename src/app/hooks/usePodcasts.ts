import axios from 'axios';
import useSWRInfinite from 'swr/infinite';

import { Podcast } from '@/lib/types';

import { apiBaseURL } from '@/constant/env';

const fetchPodcasts = (url: string) =>
  axios.get(url).then((res) => res.data as Podcast[]);

function usePodcasts(query: string, limit: number) {
  // SWR key function
  const getKey = (pageIndex: number, previousPageData: Podcast[]) => {
    // Stop fetching if we reached the end of the data
    if (previousPageData && !previousPageData.length) return null;

    // Your API endpoint with the current page index
    let url = `${apiBaseURL}/podcasts?page=${pageIndex + 1}&limit=${limit}`;
    if (query) {
      url += `&search=${query}`;
    }
    return url;
  };
  // Using useSWR to fetch data
  const { data, error, setSize, size } = useSWRInfinite(getKey, fetchPodcasts);

  const res = data as unknown as Podcast[][];
  const allPodcasts: Podcast[] = res ? res.flatMap((page) => page) : [];

  const hasMoreData = size === 0 || (res && res[size - 1]?.length > 0);

  return {
    podcasts: allPodcasts,
    hasMoreData,
    isError: error,
    setSize,
    size,
  };
}

export default usePodcasts;
