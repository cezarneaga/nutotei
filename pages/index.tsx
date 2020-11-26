import Layout from "components/layout";

export default function IndexPage({ preview }) {
  return (
    <Layout preview={preview}>
      <div className="py-20">
        <h1 className="text-5xl text-center text-gray-700 dark:text-gray-100">
          Next.js + Tailwind CSS 2.0
        </h1>
      </div>
    </Layout>
  );
}
