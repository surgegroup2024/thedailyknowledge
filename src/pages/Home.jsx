import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Newsletter from '@/components/Newsletter';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>The Daily Knowledge - Your Essential Resource</title>
        <meta name="description" content="Explore trusted articles on home decor, beauty, travel, personal finance, health, and more." />
      </Helmet>
      <Hero />
      <Categories />
      <Newsletter />
    </>
  );
};

export default Home;