import algoliasearch from "algoliasearch/lite";

const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;
const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;

const searchClient = algoliasearch(appId, searchKey);
