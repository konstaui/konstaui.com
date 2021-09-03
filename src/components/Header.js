import Link from 'next/link';
import { Container } from './Container';
import { GithubStats } from './GithubStats';
import { Logo } from './Logo';

// eslint-disable-next-line
export const Header = () => {
  return (
    <header className="bg-white top-0 border-b-[0.5px] border-black border-opacity-10">
      <Container className="flex items-center justify-between h-20">
        <div className="flex items-center space-x-4 md:space-x-8 text-black">
          <Link href="/">
            <a>
              <Logo className="w-16 h-16" />
            </a>
          </Link>
          <div className="relative group">
            <a
              href="#"
              className="group-hover:text-primary font-medium"
              onClick={(e) => e.preventDefault()}
            >
              Documentation
            </a>
            <div className="absolute z-50 left-0 -ml-4 top-full bg-white rounded overflow-hidden shadow-lg w-48 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
              <ul className="divide-y divide-black divide-opacity-5 text-sm">
                <li>
                  <Link href="/react">
                    <a className="block py-2 px-4 hover:bg-primary hover:text-white">
                      Tailwind Mobile React
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/svelte">
                    <a className="block py-2 px-4 hover:bg-primary hover:text-white">
                      Tailwind Mobile Svelte
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/vue">
                    <a className="block py-2 px-4 hover:bg-primary hover:text-white">
                      Tailwind Mobile Vue
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <GithubStats showVersion inNavbar />
        </div>
      </Container>
    </header>
  );
};
