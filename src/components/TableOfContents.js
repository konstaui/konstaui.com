import { Fragment } from 'react';

export default function TableOfContents({ tableOfContents }) {
  return (
    <ul className="text-gray-500 !mb-8">
      {tableOfContents.map((section) => (
        <Fragment key={section.slug} >
          <li className="!my-1">
            <a
              href={`#${section.slug}`}
              className="!text-gray-500 dark:!text-dark-lightGray hover:!text-primary !my-0"
            >
              {section.title}
            </a>
          </li>
          {section.children.map((subsection) => (
            <li className="ml-6 !my-1" key={subsection.slug} >
              <a
                href={`#${subsection.slug}`}
                className="!text-gray-500  hover:!text-primary !my-0"
              >
                {subsection.title}
              </a>
            </li>
          ))}
        </Fragment>
      ))}
    </ul>
  );
}
