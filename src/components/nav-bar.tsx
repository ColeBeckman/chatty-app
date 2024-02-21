import { UserButton } from '@clerk/nextjs';

const NavBar = () => {
  return (
    <div className="fixed h-full left-2.5 top-2.5">
      <UserButton afterSignOutUrl="/signIn" />
    </div>
  );
};

export default NavBar;
