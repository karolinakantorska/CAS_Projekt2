import React from 'react';
import Link from 'next/link';
import { Button } from 'react-toolbox/lib/button';


const Home = () => (
  <div>
    <Link href="/guides">
      <button>Find the coolest MTB Guide!</button>
      <Button />
    </Link>
  </div>
);
export default Home;
