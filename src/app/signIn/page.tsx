import { SignIn } from '@clerk/nextjs';

const Home = () => {
  return (
    <div className="flex justify-center h-screen items-center">
      <SignIn />
    </div>
  );
};

export default Home;
