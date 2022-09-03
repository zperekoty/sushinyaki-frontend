import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: import.meta.env.VITE_PROJECT_ID,
    dataset: "production",
    apiVersion: "2022-09-01",
    useCdn: true,
    token: import.meta.env.VITE_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export const clientFetch = (queries) => {
    for (let query of queries) {
        client.fetch(query.query).then((data) => {
            for (let _to of query.to) {
                _to(data);
            }
        });
    }
};

export const clientCreate = (documents) => {
    for (let doc of documents) {
        client.create(doc.document).then((data) => {
            for (let then of doc.then) {
                then.to(then.success);
            }
        });
    }
};
