import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Podcast = {
  __typename?: 'Podcast';
  categoryId?: Maybe<Scalars['String']['output']>;
  categoryName?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  hasFreeEpisodes?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  images?: Maybe<PodcastImages>;
  isExclusive?: Maybe<Scalars['Boolean']['output']>;
  mediaType?: Maybe<Scalars['String']['output']>;
  playSequence?: Maybe<Scalars['String']['output']>;
  publisherId?: Maybe<Scalars['String']['output']>;
  publisherName?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type PodcastImages = {
  __typename?: 'PodcastImages';
  default?: Maybe<Scalars['String']['output']>;
  featured?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  wide?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  podcasts?: Maybe<Array<Maybe<Podcast>>>;
};

export type QueryPodcastsArgs = {
  categoryName?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type GetPodcastsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetPodcastsQuery = {
  __typename?: 'Query';
  podcasts?: Array<{
    __typename?: 'Podcast';
    id?: string | null;
    title?: string | null;
    description?: string | null;
    categoryName?: string | null;
    isExclusive?: boolean | null;
    publisherName?: string | null;
    publisherId?: string | null;
    mediaType?: string | null;
    categoryId?: string | null;
    hasFreeEpisodes?: boolean | null;
    playSequence?: string | null;
    images?: {
      __typename?: 'PodcastImages';
      default?: string | null;
      featured?: string | null;
      thumbnail?: string | null;
      wide?: string | null;
    } | null;
  } | null> | null;
};

export const GetPodcastsDocument = gql`
  query GetPodcasts($page: Int, $limit: Int, $search: String) {
    podcasts(page: $page, limit: $limit, search: $search) {
      id
      title
      description
      categoryName
      images {
        default
        featured
        thumbnail
        wide
      }
      isExclusive
      publisherName
      publisherId
      mediaType
      categoryId
      hasFreeEpisodes
      playSequence
    }
  }
`;

export function useGetPodcastsQuery(
  options?: Omit<Urql.UseQueryArgs<GetPodcastsQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetPodcastsQuery, GetPodcastsQueryVariables>({
    query: GetPodcastsDocument,
    ...options,
  });
}
