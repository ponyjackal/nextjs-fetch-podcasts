import axios from 'axios';
import useSWR from 'swr';

import { apiBaseURL } from '@/constant/env';

const fetchPodcasts = (query: string) => {
  let url = `${apiBaseURL}/podcasts`;
  if (query) {
    url += `?search=${query}`;
  }

  return axios.get(url).then((res) => res.data);
};

function usePodcasts(query: string) {
  // Using useSWR to fetch data
  const { data, error } = useSWR(query ? ['podcasts', query] : 'podcasts', () =>
    fetchPodcasts(query)
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default usePodcasts;
