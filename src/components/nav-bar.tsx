import { UserButton } from '@clerk/nextjs';

const NavBar = () => {
  return (
    <div className="absolute h-full left-2.5 top-2.5">
      <UserButton />
    </div>
  );
};

export default NavBar;
