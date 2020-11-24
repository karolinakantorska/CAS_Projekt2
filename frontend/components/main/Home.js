import React from 'react';
import Link from 'next/link';
import Button from '@material-ui/core/Button';


const Home = () => (
  <div>
    <Link href="/guides">
      <Button variant="outlined">Find the coolest MTB Guide!</Button>
    </Link>
  </div>
);
export default Home;
