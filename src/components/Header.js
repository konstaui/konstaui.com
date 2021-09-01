import Link from 'next/link';
import { Container } from './Container';
import { GithubStats } from './GithubStats';
import { Logo } from './Logo';

export const Header = () => (
  <header className="bg-white top-0 border-b-[0.5px] border-black border-opacity-10">
    <Container className="flex items-center justify-between h-20">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <a>
            <Logo className="w-16 h-16" />
          </a>
        </Link>
        <span>Coming soon</span>
        {/* <a
              className="text-black hover:text-primary font-semibold transition-colors duration-100"
              href="#"
            >
              Get started
            </a>
            <a
              className="text-black hover:text-primary font-semibold transition-colors duration-100"
              href="#"
            >
              Documentation
            </a> */}
      </div>
      <div className="flex items-center space-x-4">
        <GithubStats showVersion />
      </div>
    </Container>
  </header>
);