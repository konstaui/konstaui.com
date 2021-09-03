import { useEffect, useState } from 'react';
import { GithubIcon } from './GithubIcon';

function getLocalStats() {
  return {
    stars: localStorage.getItem('twm-git-stats-stars'),
    forks: localStorage.getItem('twm-git-stats-forks'),
  };
}

async function fetchGitStats(local) {
  if (local) {
    return getLocalStats();
  }
  const res = await fetch(
    'https://api.github.com/repos/tailwind-mobile/tailwind-mobile'
  );
  const { stargazers_count, forks } = await res.json();
  if (stargazers_count || forks) {
    localStorage.setItem('twm-git-stats-date', new Date().getTime());
  }
  if (stargazers_count) {
    localStorage.setItem(
      'twm-git-stats-stars',
      stargazers_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    );
  }
  if (forks || forks === 0) {
    localStorage.setItem(
      'twm-git-stats-forks',
      forks.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    );
  }
  return getLocalStats();
}

export function GithubStats(props) {
  const { showVersion, inNavbar } = props;
  const [data, setData] = useState([]);
  useEffect(() => {
    const gitStatsDate = localStorage.getItem('twm-git-stats-date');
    const local =
      gitStatsDate && new Date().getTime() - gitStatsDate * 1 < 1000 * 60 * 60;
    fetchGitStats(local).then((res) => {
      setData(res);
    });
  }, []);
  return (
    <div className="">
      <a
        className="text-black hover:text-primary hover:no-underline inline-flex items-center"
        href="https://github.com/tailwind-mobile/tailwind-mobile"
        rel="noopener"
        target="_blank"
      >
        {showVersion && (
          <span className="font-semibold mr-2">
            v{process.env.tailwindMobileVersion}
          </span>
        )}
        <GithubIcon className="inline-block" height="24" />
        <div className={inNavbar ? `hidden sm:flex` : ''}>
          {[
            [data.stars, 'stars'],
            [data.forks, 'forks'],
          ].map(([value, label]) => (
            <span className="ml-2 text-xs" key={label}>
              <span className="text-base font-medium">{value}</span>{' '}
              <span>{label}</span>
            </span>
          ))}
        </div>
      </a>
    </div>
  );
}
