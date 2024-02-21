import { UserButton } from '@clerk/nextjs';

const NavBar = () => {
  return (
<<<<<<< Updated upstream
    <div className="absolute h-full left-2.5 top-2.5">
      <UserButton />
=======
    <div className="fixed h-full left-2.5 top-2.5">
      <UserButton afterSignOutUrl="/signIn" />
>>>>>>> Stashed changes
    </div>
  );
};

export default NavBar;
