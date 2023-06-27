import { useEffect, useState } from 'react';
import { GithubIcon } from './GithubIcon';

function getLocalStats() {
  return {
    stars: localStorage.getItem('konsta-git-stats-stars'),
  };
}

async function fetchGitStats(local) {
  if (local) {
    return getLocalStats();
  }
  const res = await fetch('https://api.github.com/repos/konstaui/konsta');
  const { stargazers_count } = await res.json();
  if (stargazers_count) {
    localStorage.setItem('konsta-git-stats-date', new Date().getTime());
  }
  if (stargazers_count) {
    localStorage.setItem(
      'konsta-git-stats-stars',
      stargazers_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    );
  }
  return getLocalStats();
}

export function GithubStats(props) {
  const { showVersion, inNavbar } = props;
  const [data, setData] = useState([]);
  useEffect(() => {
    const gitStatsDate = localStorage.getItem('konsta-git-stats-date');
    const local =
      gitStatsDate && new Date().getTime() - gitStatsDate * 1 < 1000 * 60 * 60;
    fetchGitStats(local).then((res) => {
      setData(res);
    });
  }, []);
  return (
    <div className="">
      <a
        className="text-black hover:text-primary hover:no-underline inline-flex items-center dark:text-white"
        href="https://github.com/konstaui/konsta"
        rel="noopener"
        target="_blank"
      >
        {showVersion && (
          <span className="font-semibold mr-2">
            v{process.env.konstaVersion}
          </span>
        )}
        <GithubIcon className="inline-block" height="24" />
        <div className={inNavbar ? `hidden sm:flex` : ''}>
          <span className="ml-2 text-xs">
            <span className="text-base font-medium">{data.stars}</span>{' '}
            <span>stars</span>
          </span>
        </div>
      </a>
    </div>
  );
}
