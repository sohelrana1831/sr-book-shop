import { Button } from '@/components/ui/button';
import { BiBookReader } from 'react-icons/bi';
import { RiFacebookBoxFill, RiInstagramLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="bg-[#242630] text-secondary p-20">
      <div className="flex justify-between">
        <div>
          <Button variant="link" asChild>
            <Link to="/">
              <h1 className="text-2xl inline-flex text-white">
                SR{' '}
                <span className="text-cyan-500 flex flex-initial font-mono font-bold">
                  {' '}
                  B<BiBookReader />k{' '}
                </span>{' '}
                Shop
              </h1>
            </Link>
          </Button>
          <p className="w-80 text-justify">
            This book describes how a detective tracks down a serial killer.
            Park Town is a renowned neighborhood in Berlin. In the city, the
            insane only brutally murder their lovers. Psycho will reveal the
            information before the couple is murdered. The story comes to a
            close with the investigator identifying the murderer using
            conflicting clues.
          </p>
        </div>
        <div className="flex gap-20">
          <ul className="space-y-2">
            <li>Upcoming</li>
            <li>Shipping</li>
            <li>How it works</li>
          </ul>
          <ul className="space-y-2">
            <li>Support</li>
            <li>Careers</li>
          </ul>
          <ul className="space-y-2">
            <li>List your gear</li>
            <li>Contact team</li>
          </ul>
        </div>
        <div className="flex gap-2 text-2xl">
          <RiFacebookBoxFill />
          <RiInstagramLine />
        </div>
      </div>
      <div className="flex w-full mt-20 gap-5">
        <p>Privacy Policy</p>
        <p>Terms & Condition</p>
        <p className="ml-auto"> &#169; SR Book Shop {year}</p>
      </div>
    </div>
  );
}
