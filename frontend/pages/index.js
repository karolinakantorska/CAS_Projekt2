
import Home from '../components/Home'
import Link from "next/link";


import withApollo from '../lib/withApollo';

/*
const Index = () => {
  const { loading, data } = useQuery(QUERY);

  if (loading || !data) {
    return <h1>loading...</h1>;
  }
  return <h1>{data.title}</h1>;
};
*/

const HomePage = props => (

    <div>
      <Home />
    </div>

    
);
export default HomePage;