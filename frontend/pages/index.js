import Link from "next/link";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import withApollo from '../lib/withApollo';

const QUERY = gql`
  {
    users {
      name
    }
  }
`;
/*
const Index = () => {
  const { loading, data } = useQuery(QUERY);

  if (loading || !data) {
    return <h1>loading...</h1>;
  }
  return <h1>{data.title}</h1>;
};
*/

const Home = props => {
  const { loading, data } = useQuery(QUERY);
  console.log(loading, data);
  if (loading || !data) {
    <div>
      <p>loading... a Home Page</p>
    </div>;
  }
  return (
    <div>
      <p>Home Page</p>
    </div>
  );
    
};
export default Home;