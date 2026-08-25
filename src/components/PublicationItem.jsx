import React from 'react';

const PublicationItem = ({ pub }) => {
  const title = pub.title;
  const authors = pub.authors;
  const year = pub.year;
  const journal = pub.journal;
  const url = pub.url || pub.link;

  return (
    <li className="pl-4 marker:text-blue-900 dark:marker:text-blue-400 marker:font-bold">
      <div className="space-y-1">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-900 dark:text-blue-400 hover:underline font-serif text-xl font-semibold block"
          >
            {title}
          </a>
        ) : (
          <div className="text-black dark:text-red-500 font-serif text-xl font-semibold">
            {title}
          </div>
        )}

        {authors && (
          <div className="text-gray-700 dark:text-red-400 text-base italic">
            {authors}
          </div>
        )}

        <div className="text-gray-600 dark:text-red-300 text-base">
          {year && <span className="font-semibold">{year}</span>}
          {year && journal && <span className="mx-2">•</span>}
          {journal && <span className="italic">{journal}</span>}
        </div>
      </div>
    </li>
  );
};

export default PublicationItem;
