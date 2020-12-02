import algoliasearch from "algoliasearch/lite";
import { getCountyById } from "lib/api";
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;
const searchKey = process.env.ALGOLIA_API_KEY;
const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;

const client = algoliasearch(appId, searchKey);

const algoliaHandler = async (req, res) => {
  const index = client.initIndex(indexName);
  const eventType = req.headers["x-contentful-topic"].split(".")[2];

  const { sys, fields } = req.body;

  const { id: objectID, updatedAt } = sys;
  const countyId = fields?.county?.ro?.sys?.id;
  const county = countyId ? await getCountyById(countyId) : null;

  if (eventType === "publish") {
    const object = {
      objectID,
      name: fields.name.ro,
      slug: fields.slug.ro,
      review: {
        review: fields.review.ro,
      },
      party: fields.party.ro,
      county,
      updatedAt,
    };
    // @ts-ignore
    await index.saveObject({ objectID, ...object });
    return res.status(200).send({ success: true });
  }
  if (eventType === "delete") {
    // @ts-ignore
    await index.deleteObject(objectID);
    return res.status(202).end();
  }

  res.send({
    message: `Event type ${eventType} is not a valid trigger`,
  });
};

export default algoliaHandler;
