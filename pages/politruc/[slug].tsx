import { ArticleJsonLd, NextSeo } from 'next-seo';
import Head from 'next/head';
import Image from 'next/image';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Layout from 'components/layout';

import { getCandidateBySlug, getAllCandidatesWithSlugs } from 'lib/api';
import { Candidate } from '../../lib/contentTypes';
import { Facebook } from 'react-feather';
type Props = {
  candidate: Candidate;
  moreCandidates: Candidate[];
  preview: boolean;
};

const Bold = ({ children }) => <strong>{children}</strong>;
const Text = ({ children }) => <p>{children}</p>;

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
};
export default function Candidat({
  candidate,
  moreCandidates,
  preview,
}: Props) {
  const router = useRouter();

  if (!router.isFallback && !candidate) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <>Loading…</>
      ) : (
        <>
          <NextSeo
            title={`${candidate?.name} - Nu tot ei!`}
            description={candidate?.review}
            canonical={`https://nutotei.ro/candidat/${candidate?.slug}`}
            openGraph={{
              url: `https://nutotei.ro/candidat/${candidate?.slug}`,
              title: `${candidate?.name} - Nu tot ei!`,
              description: candidate?.review,
              images: [candidate?.mainImage],
            }}
          />
          <ArticleJsonLd
            url={`https://nutotei.ro/candidat/${candidate?.slug}`}
            title={candidate?.name}
            images={[candidate?.mainImage.url]}
            datePublished={candidate?.sys.firstPublishedAt}
            dateModified={candidate?.sys.firstPublishedAt}
            authorName={['Valeriu Nicolae']}
            publisherName="Valeriu Nicolae"
            publisherLogo=""
            description={candidate?.review}
          />
          <article>
            <Head>
              <title>{candidate.name} | Nu tot ei!</title>
              <meta property="og:image" content={candidate?.mainImage.url} />
            </Head>

            <div className="bg-white overflow-hidden">
              <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen"></div>
                <div className="mx-auto text-base max-w-prose lg:max-w-none">
                  <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">
                    {candidate.party}
                  </h2>
                  <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    {candidate.name}
                  </h3>
                </div>
                <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
                  <div className="relative lg:row-start-1 lg:col-start-2">
                    <svg
                      className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20"
                      width="404"
                      height="384"
                      fill="none"
                      viewBox="0 0 404 384"
                      aria-hidden="true"
                    >
                      <defs>
                        <pattern
                          id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                          x="0"
                          y="0"
                          width="20"
                          height="20"
                          patternUnits="userSpaceOnUse"
                        >
                          <rect
                            x="0"
                            y="0"
                            width="4"
                            height="4"
                            className="text-gray-200"
                            fill="currentColor"
                          />
                        </pattern>
                      </defs>
                      <rect
                        width="404"
                        height="384"
                        fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
                      />
                    </svg>
                    <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                      <figure>
                        <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                          <Image
                            className="rounded-lg shadow-lg object-cover object-center"
                            src={candidate.mainImage.url}
                            alt={candidate.mainImage.title}
                            width={1184}
                            height={1376}
                            layout="responsive"
                          />
                        </div>
                        <figcaption className="mt-3 flex flex-col text-sm text-gray-500">
                          {candidate.facebookLink && (
                            <a
                              href={candidate.facebookLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Sursa Facebook"
                              className="text-blue-600 flex hover:text-blue-700 cursor-pointer clickable h-4"
                            >
                              <Facebook size={18} className="inline" />
                              <span className="ml-2 my-auto inline">
                                Sursa articolului pe facebook
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="pl-2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </a>
                          )}
                          {candidate?.documentsCollection?.items.map((cv) => (
                            <a
                              key={cv.fileName}
                              href={cv.url}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="mt-4 text-red-700 flex hover:text-red-800 cursor-pointer clickable h-4"
                              title={`Sursa CV - ${cv.title}`}
                            >
                              <svg
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              <span className="ml-2 my-auto">
                                Vizualizează CV-ul - {cv.fileName}
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="pl-2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </a>
                          ))}
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                  <div className="mt-8 lg:mt-0">
                    <div className="text-base max-w-prose mx-auto lg:max-w-none">
                      <strong className="text-lg text-gray-500">
                        {candidate.review}
                      </strong>
                    </div>
                    <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                      {documentToReactComponents(
                        candidate.content.json,
                        options
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </>
      )}
    </Layout>
  );
}
export async function getStaticProps({
  params,
  preview = false,
}: {
  params: { slug: string; secret: string };
  preview: boolean;
}) {
  const { secret, slug } = params;
  const { candidate, moreCandidates } = await getCandidateBySlug(
    slug,
    4,
    preview
  );

  return {
    props: {
      preview,
      candidate,
      moreCandidates,
    },
  };
}

export async function getStaticPaths() {
  const allCandidates: Candidate[] = await getAllCandidatesWithSlugs();
  return {
    paths: allCandidates?.map(({ slug }) => `/politruc/${slug}`),
    fallback: true,
  };
}
