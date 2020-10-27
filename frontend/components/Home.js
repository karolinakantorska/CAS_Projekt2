import React from 'react';
import Link from 'next/link';
import Signin from './Signin';
import Signup from './Signup'

const Home = () => (
  <div>
    <Link href="/guides">
      <button>Find the coolest MTB Guide!</button>
    </Link>
  </div>
);
export default Home;
