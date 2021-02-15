import {
  makeLoadArticlesController,
  MongoHelper,
} from '@newsletter-converter/core';
import { GetStaticProps } from 'next';
import parse from 'html-react-parser';
import env from '../src/config/env';
import { useState } from 'react';

const SECOND_IN_MILLISECONDS = 1000;

interface HomeProps {
  articles: {
    content: string;
  }[];
}

export default function Home({ articles }: HomeProps) {
  const [index, setIndex] = useState(0);
  const handleCOntainerClick = () => {
    setIndex((current) => current + 1);
  };

  return (
    <div className='h-screen p-12' onClick={handleCOntainerClick}>
      <div className='bg-gray-100 rounded-2xl p-8'>
        <div className='space-y-4'>
          <p className='text-3xl'>{parse(articles[index].content)}</p>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  MongoHelper.uri = env.MONGO_URI;
  const {
    body: { articles },
  } = await makeLoadArticlesController().handle({});

  return {
    props: {
      articles: articles.map(({ content }) => ({
        content,
      })),
    },
    revalidate: 5 * SECOND_IN_MILLISECONDS,
  };
};
