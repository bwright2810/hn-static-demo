import type { NextPage } from 'next';
import Head from 'next/head';
import { sample } from 'underscore';
import { ClipLoader } from 'react-spinners';
import { useState } from 'react';

const Home: NextPage = ({ stories }: any) => {
  const [regenerating, setRegenerating] = useState(false);

  const onRegenerate = async () => {
    setRegenerating(true);
    await fetch(`${window.location.origin}/api/revalidate`)
      .then((res) => res.json())
      .then((_data) => setTimeout(() => window.location.reload(), 500));
  };

  return (
    <div>
      <Head>
        <title>HN Static Demo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col">
        <div className="flex justify-end">
          <ClipLoader loading={regenerating} className="mt-6" />
          <button className="btn btn-primary m-5 mr-20 z-10" type="button" onClick={onRegenerate}>Regenerate Stories</button>
        </div>
        <div className="flex justify-center -mt-20">
          <div className="flex flex-col items-center ml-auto mr-auto">
            {stories.map((story: any) => (
              <div className="mt-3 mb-3" key={story.id}>
                <a className="link link-primary" href={story.url}>{story.title}</a>
                {' '}
                (
                {story.time}
                ) -
                {' '}
                <a className="link link-primary" href={story.comments}>Comments Link</a>
                {' '}
                [
                {story.score}
                {' '}
                score]
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
  const storyIds = await res.json();
  const randStoryIds = sample(storyIds, 10);

  const stories: any[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for await (const id of randStoryIds) {
    const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    const storyObj = await storyRes.json();
    if (storyObj.url && storyObj.title) {
      const date = new Date(0); // The 0 there is the key, which sets the date to the epoch
      date.setUTCSeconds(storyObj.time);
      const time = date.toLocaleDateString('en-us', {
        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric',
      });
      stories.push({
        id,
        title: storyObj.title,
        score: storyObj.score,
        url: storyObj.url,
        comments: `https://news.ycombinator.com/item?id=${id}`,
        time,
      });
    }
  }

  return {
    props: { stories },
  };
}

export default Home;
