import React from 'react';
import Link from 'next/link';


const Home = () => (
  <div>
    <Link href="/guides">
      <button>Find the coolest MTB Guide!</button>
    </Link>
  </div>
);
export default Home;
