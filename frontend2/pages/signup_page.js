import Signup from '../components/signin_signout/Signup';
import ClientOnly from '../components/main/ClientOnly';
const Signup_page = () => {
  return (
    <ClientOnly>
      <Signup />
    </ClientOnly>
  );
};

export default Signup_page;
