import Signin from '../components/signin_signout/Signin';
import ClientOnly from '../components/main/ClientOnly';
const Signin_page = () => {
  return (
    <ClientOnly>
      <Signin />
    </ClientOnly>
  );
};

export default Signin_page;
