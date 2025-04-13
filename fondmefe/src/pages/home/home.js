// ./pages/home/home.js
import React from 'react';
import Header from './components/header';
import Performance from './components/performance';
import SearchBar from './components/search';
import PopularProjects from './components/projectlist';
const Home = () => {
  return (
    <section>
      <Header />
      <Performance />
      <SearchBar />
      <PopularProjects title="Popular" />
      <PopularProjects title="Recommended" />
      <PopularProjects title="Interviews" />
    </section>
  );
};

export default Home;
