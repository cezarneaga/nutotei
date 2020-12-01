import { NextSeo } from "next-seo";
import Layout from "components/layout";
import { Latest } from "components/latest";

import { getCandidatesByCounty } from "../lib/api";
import { Candidate } from "../lib/contentTypes";
import { CountiesMap } from "components/counties-map"
import { getCountyCodeByName } from "components/counties-map/mnemonics"

export default function IndexPage({
  preview,
  candidatesByCounty,
}: {
  preview: boolean;
  candidatesByCounty: Candidate[];
}) {

  const filterCanditatesByCounty = (mapEvent: unknown) => {
    const { name } = mapEvent as { name: string }
    const countyCode = getCountyCodeByName(name)
    console.log('countyCode', countyCode)
  }

  return (
    <Layout preview={preview}>
      <NextSeo
        title={`Harta - Nu tot ei!`}
        description={`Harta pe judete`}
        canonical={`https://nutotei.ro/harta`}
        openGraph={{
          url: `https://nutotei.ro/harta`,
          title: `Harta - Nu tot ei!`,
          description: `Harta pe judete`,
        }}
      />

      <CountiesMap onClick={filterCanditatesByCounty} data={[{ name: 'Cluj', value: 10 }]} />
      <Latest candidates={candidatesByCounty} />
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const candidatesByCounty = await getCandidatesByCounty('CJ', false);
  return {
    props: {
      preview,
      candidatesByCounty,
    },
  };
}
