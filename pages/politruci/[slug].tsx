import { NextSeo } from 'next-seo';
import { splitAt } from 'ramda';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { useSWRInfinite } from 'swr';
import Layout from 'components/layout';
import { Latest } from 'components/latest';
import { CandidateCard } from 'components/candidate-card';
import { CategoryHeader } from 'components/category-header';
import {
  getCandidatesByParty,
  swrFetcher,
  getCandidatesTotalByParty,
} from 'lib/api';
import { Candidate } from 'lib/contentTypes';
import { parties, Party } from 'lib/parties';
type Props = {
  latest: Candidate[];
  older: Candidate[];
  preview: boolean;
  category: Party;
  total: number;
};
const limit = 6;
export default function Candidat({
  latest,
  older,
  category,
  preview,
  total,
}: Props) {
  const router = useRouter();
  if (!router.isFallback && !latest) {
    return <ErrorPage statusCode={404} />;
  }

  const { data, error, size, setSize } = useSWRInfinite((index) => {
    return `{candidateCollection(where: {party: "${
      category.partyShort
    }"}, order: sys_firstPublishedAt_DESC, limit: ${limit}, skip: ${
      index * limit + 6
    }) {
        items {
          sys {
            id
            firstPublishedAt
          }
          name
          slug
          review
          mainImage {
            url
            title
            width
            height
          }
        }
      }
    }`;
  }, swrFetcher);

  const isLoadingInitialData = !data && !error;
  const isSSR = typeof window === 'undefined';
  const isLoadingMore = !isSSR
    ? isLoadingInitialData ||
      (size > 0 && data && typeof data[size - 1] === 'undefined')
    : false;
  const candidates = data ? [].concat(...data) : [];
  const isEmpty = data?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <>Loading…</>
      ) : (
        <>
          <NextSeo
            title={`De la ${category.partyShort} - Nu tot ei!`}
            description={category?.party}
            canonical={`https://nutotei.ro/politruci/${category?.slug}`}
            openGraph={{
              url: `https://nutotei.ro/politruci/${category?.slug}`,
              title: `De la ${category?.partyShort} - Nu tot ei!`,
              description: category?.party,
              images: latest?.map((candidate) => candidate.mainImage),
            }}
          />
          <CategoryHeader category={category} number={total} />
          <Latest candidates={latest} />
          {older.length > 0 && (
            <div className="bg-white">
              <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
                  <div className="space-y-5 sm:space-y-4">
                    <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                      {`Stai liniștit că mai sunt. Uite încă ${total - 4}!`}
                    </h2>
                    <p className="text-xl text-gray-500">
                      Pe ei i-am analizat noi până acum. Dacă mai știi tu pe
                      cineva, trimite-ne detalii!
                    </p>
                    <div className="mt-8 rounded-md shadow sm:mt-4 ">
                      <a
                        href="mailto:valeriu@nutotei.ro"
                        className="w-full md:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                      >
                        Trimite-ne CV-uri
                      </a>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8">
                      {older.map((candidate) => (
                        <CandidateCard
                          candidate={candidate}
                          key={candidate.sys.id}
                        />
                      ))}
                      {candidates &&
                        candidates.map((candidate) => (
                          <CandidateCard
                            candidate={candidate}
                            key={candidate.sys.id}
                          />
                        ))}
                    </ul>
                    <button
                      className="mt-12 w-full md:w-auto md:mx-auto flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-red-600 border-red-600 hover:bg-gray-100 md:py-2 md:text-lg md:px-4"
                      disabled={
                        typeof window !== 'undefined'
                          ? isLoadingMore || isReachingEnd
                          : true
                      }
                      onClick={() => setSize(size + 1)}
                    >
                      {typeof window !== 'undefined'
                        ? isLoadingMore
                          ? 'se încarcă...'
                          : isReachingEnd
                          ? 'cam atât deocamdată'
                          : 'mai mulți'
                        : 'se încarcă...'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
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
  const category = parties.find((party) => party.slug === slug);
  const candidates = await getCandidatesByParty(
    category.partyShort,
    6,
    preview
  );
  const total = await getCandidatesTotalByParty(category.partyShort);
  const [latest, older] = splitAt(4, candidates);

  return {
    props: {
      preview,
      category,
      latest,
      older,
      total,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: parties?.map(({ slug }) => `/politruci/${slug}`),
    fallback: true,
  };
}
