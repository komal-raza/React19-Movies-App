import { Client, Databases, ID, Query } from "appwrite";

const PROJECTID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASEID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTIONID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(PROJECTID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const result = await database.listDocuments(DATABASEID, COLLECTIONID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    if (result?.documents?.length > 0) {
      const doc = result?.documents[0];
      await database.updateDocument(DATABASEID, COLLECTIONID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      await database.createDocument(DATABASEID, COLLECTIONID, ID.unique(), {
        count: 1,
        searchTerm,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASEID, COLLECTIONID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result?.documents || [];
  } catch (error) {
    console.error("Error fetching trending movies:", error);
  }
};
