import Layout from "components/layout";
import { Hero } from "components/hero";
import { Latest } from "components/latest";
import { getCandidates } from "../lib/api";
import { Candidate } from "../lib/contentTypes";
export default function IndexPage({
  preview,
  latestCandidates,
}: {
  preview: boolean;
  latestCandidates: Candidate[];
}) {
  return (
    <Layout preview={preview}>
      <Hero />
      <Latest candidates={latestCandidates} />
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const latestCandidates = await getCandidates(4, preview);
  return {
    props: {
      preview,
      latestCandidates,
    },
  };
}
