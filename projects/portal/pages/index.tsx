import {
  makeLoadArticlesController,
  MongoHelper,
} from '@newsletter-converter/core';
import { GetStaticProps } from 'next';
import parse from 'html-react-parser';
import env from '../src/config/env';

const TWO_HOURS_IN_MILLISECONDS = 2 * 60 * 60 * 1000;

interface HomeProps {
  articles: {
    content: string;
  }[];
}

export default function Home({ articles }: HomeProps) {
  return (
    <div className='h-screen p-4'>
      <div className='gap-4 grid grid-cols-1 overflow-y-scroll scroll-container'>
        <style>
          {`
            .scroll-container {
              scroll-snap-type: y mandatory;
            }
            .scroll-item {
              scroll-snap-align: start;
            }
            .scroll-item:last-child {
              height: 100vh;
            }
          `}
        </style>
        {articles.map((newObj, i) => (
          <div key={i} className='scroll-item'>
            <div className='bg-gray-100 rounded-xl py-4 px-8'>
              <p className='text-lg '>{parse(newObj.content)}</p>
            </div>
          </div>
        ))}
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
    revalidate: TWO_HOURS_IN_MILLISECONDS,
  };
};
