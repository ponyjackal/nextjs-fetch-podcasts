/* eslint-disable @next/next/no-img-element */
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';

import { Podcast } from '@/lib/types';

export function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <Card className='mt-6 w-96' placeholder=''>
      <CardHeader color='blue-gray' className='relative h-56' placeholder=''>
        <img src={podcast.images.thumbnail} alt='card-image' />
      </CardHeader>
      <CardBody placeholder=''>
        <Typography
          variant='h5'
          color='blue-gray'
          className='mb-2'
          placeholder=''
        >
          {podcast.title}
        </Typography>
        <Typography
          variant='h6'
          color='blue-gray'
          className='mb-2'
          placeholder=''
        >
          {podcast.categoryName}
        </Typography>
        <Typography placeholder=''>{podcast.description}</Typography>
      </CardBody>
      <CardFooter className='pt-0' placeholder=''>
        <Button placeholder=''>Listen Now</Button>
      </CardFooter>
    </Card>
  );
}
