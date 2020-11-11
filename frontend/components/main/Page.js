
import Nav from './Nav';
import Meta from './Meta';


const Page = (props) => {
  return (
    <div>
      <Meta />
      <Nav />
      <div>{props.children}</div>
    </div>
  );
};

export default Page;
