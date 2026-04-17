import { trackOutbound } from '../shared/track-outbound';
import baseSponsors from '../shared/sponsors-list.json';
import n4Sponsors from '../shared/n4-sponsors.json';

const sponsors = [...n4Sponsors, ...baseSponsors];

const resolveImage = (image) =>
  /^https?:\/\//.test(image) ? image : `/images/sponsors/${image}`;

const PlanSection = (props) => {
  const { showPlaceholder, showTitle } = props;
  const items = sponsors.filter(({ plan }) => props.plan === plan);
  const sizes = {
    'Platinum Sponsor': 'm-2 w-40 h-40',
    'Gold Sponsor': 'm-2 w-36 h-36',
    'Silver Sponsor': 'm-2 sm:m-3 w-24 h-24 sm:w-32 sm:h-32',
    Sponsor: 'm-2 w-16 h-16 sm:w-24 sm:h-24',
  }[props.plan];

  if (!items.length && !showPlaceholder) return null;

  return (
    <div className="mb-20">
      {showTitle && (
        <h2 className="mb-4 text-center text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-gray-200">
          {props.plan}s
        </h2>
      )}
      <div className="flex flex-wrap justify-center">
        {items.map(({ link, title, image }) => (
          <a
            className={`flex items-center justify-center text-center duration-300 dark:bg-white dark:p-0.5 ${sizes}`}
            href={link}
            key={title}
            title={title}
            rel="noopener"
            target="_blank"
            onClick={() => trackOutbound(link)}
          >
            <img
              className="h-auto max-h-full w-auto max-w-full"
              src={resolveImage(image)}
              alt={title}
            />
          </a>
        ))}
        {showPlaceholder && (
          <a
            className={`m-4 flex items-center justify-center bg-gray-100 p-3 text-center text-sm font-semibold duration-300 hover:bg-gray-200 hover:no-underline ${sizes}`}
            href="https://sponsors.nolimits4web.com"
            onClick={() => trackOutbound('https://sponsors.nolimits4web.com')}
            rel="noopener"
            target="_blank"
          >
            Become {props.plan}
          </a>
        )}
      </div>
    </div>
  );
};

export default function HeroSponsors({ showPlaceholders, showTitles }) {
  return (
    <>
      <PlanSection
        showPlaceholder={showPlaceholders}
        showTitle={showTitles}
        plan="Silver Sponsor"
      />
      <PlanSection
        showPlaceholder={showPlaceholders}
        showTitle={showTitles}
        plan="Sponsor"
      />
    </>
  );
}
