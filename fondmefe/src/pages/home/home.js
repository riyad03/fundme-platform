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
      <PopularProjects status="Popular" />
      {/*
      <PopularProjects status="Recommended" />
      <PopularProjects status="Interviews" /> */}
    </section>
  );
};

export default Home;
