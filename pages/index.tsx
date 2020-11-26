import Layout from "components/layout";
import { Hero } from "components/hero";
import { Latest } from "components/latest";
import { LatestParty } from "components/latest-party";
import { getCandidates, getCandidatesByParty } from "../lib/api";
import { Candidate } from "../lib/contentTypes";
export default function IndexPage({
  preview,
  latestCandidates,
  psdCandidates,
  pnlCandidates,
  pmpCandidates,
  proCandidates,
  aldeCandidates,
}: {
  preview: boolean;
  latestCandidates: Candidate[];
  psdCandidates: Candidate[];
  pnlCandidates: Candidate[];
  pmpCandidates: Candidate[];
  proCandidates: Candidate[];
  aldeCandidates: Candidate[];
}) {
  return (
    <Layout preview={preview}>
      <Hero />
      <Latest candidates={latestCandidates} />
      <LatestParty candidates={psdCandidates} slug="psd" />
      <LatestParty candidates={pnlCandidates} slug="pnl" />
      <LatestParty candidates={pmpCandidates} slug="pmp" />
      <LatestParty candidates={proCandidates} slug="pro-romania" />
      <LatestParty candidates={aldeCandidates} slug="alde" />
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const latestCandidates = await getCandidates(4, preview);
  const psdCandidates = await getCandidatesByParty("PSD", 6, preview);
  const pnlCandidates = await getCandidatesByParty("PNL", 6, preview);
  const pmpCandidates = await getCandidatesByParty("PMP", 4, preview);
  const proCandidates = await getCandidatesByParty("PRO Romania", 4, preview);
  const aldeCandidates = await getCandidatesByParty("ALDE", 4, preview);
  return {
    props: {
      preview,
      latestCandidates,
      psdCandidates,
      pnlCandidates,
      pmpCandidates,
      proCandidates,
      aldeCandidates,
    },
  };
}
