import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { DropdownMenuSeparator } from '../components/ui/dropdown-menu';
import { DropdownMenuLabel } from '../components/ui/dropdown-menu';
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '../components/ui/dropdown-menu';
import { HiOutlineSearch } from 'react-icons/hi';
import { BiBookReader } from 'react-icons/bi';
import { FaUserLock, FaUserTie } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { signOut } from 'firebase/auth';
import { setUser } from '@/redux/features/user/userSlices';
import { auth } from '@/lib/firebase';

export default function Navbar() {
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const handelLogout = () => {
    console.log('logout');
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(setUser(null));
    });
  };
  return (
    <nav className="w-full  h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <Button variant="link" asChild>
              <Link to="/">
                <h1 className="text-2xl inline-flex">
                  SR{' '}
                  <span className="text-cyan-500 flex flex-initial font-mono font-bold">
                    {' '}
                    B<BiBookReader />k{' '}
                  </span>{' '}
                  Shop
                </h1>
              </Link>
            </Button>
          </div>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/books">Books</Link>
                </Button>
              </li>
              {users.email && (
                <li>
                  <Button variant="link" asChild>
                    <Link to="/add-new-book">Add New Book</Link>
                  </Button>
                </li>
              )}
              <li>
                <Button variant="ghost">
                  <HiOutlineSearch size="25" />
                </Button>
              </li>

              <li className="ml-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    {!users.email ? (
                      <FaUserLock className="text-3xl" />
                    ) : (
                      <FaUserTie className="text-3xl  text-cyan-500" />
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      Subscription
                    </DropdownMenuItem>
                    {!users.email && (
                      <>
                        <Link to="/login">
                          <DropdownMenuItem className="cursor-pointer">
                            Login
                          </DropdownMenuItem>
                        </Link>
                        <Link to="/singup">
                          <DropdownMenuItem className="cursor-pointer">
                            Sing up
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                    {users.email && (
                      <DropdownMenuItem
                        onClick={() => handelLogout()}
                        className="cursor-pointer"
                      >
                        logout
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
