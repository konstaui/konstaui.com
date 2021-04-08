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

export function GithubStats() {
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
    <div className="inline-flex items-center">
      <GithubIcon className="inline-block" height="20" />
      {[
        [data.stars, 'stars'],
        [data.forks, 'forks'],
      ].map(([value, label]) => (
        <a
          key={label}
          className="mx-1 text-xs text-gray-700 hover:text-primary hover:no-underline"
          href="https://github.com/tailwind-mobile/tailwind-mobile"
          rel="noopener"
          target="_blank"
        >
          <span className="text-base font-medium">{value}</span>{' '}
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}
