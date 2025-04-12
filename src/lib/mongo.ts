import { ClientSession, MongoClient, UpdateFilter } from "mongodb";

import { ChatDocument, ConversationMessage } from "@/types/chats.types";
import { CrawlingMetaData } from "@/types/crawl.types";

import { serverEnv } from "./env/server";

const dbClient = new MongoClient(serverEnv().MONGODB_URI);
await dbClient.connect();

const db = dbClient.db(serverEnv().MONGODB_DB_NAME);

const embeddingsCollection = db.collection(serverEnv().MONGODB_COLLECTION_EMBEDDINGS);
const crawlingMetaDataCollection = db.collection<CrawlingMetaData>(serverEnv().MONGODB_COLLECTION_CRAWLING_META);
const chatsCollection = db.collection<ChatDocument>(serverEnv().MONGODB_COLLECTION_CHATS);

async function appendToConversation(
  sessionId: string,
  message: string,
  title: string | null,
  type: 'bot' | 'user',
  mongoSession?: ClientSession
) {
  const newMessage: ConversationMessage = {
    message,
    type,
    createdAt: new Date().toString(),
  };

  const setOnInsert: Partial<ChatDocument> = {
    createdAt: new Date().toString(),
  };

  if (title !== null) {
    setOnInsert.title = title;
  }

  const update: UpdateFilter<ChatDocument> = {
    $setOnInsert: setOnInsert,
    $push: {
      conversation: newMessage,
    },
  };

  await chatsCollection.updateOne(
    { chatId: sessionId },
    update,
    { upsert: true, session: mongoSession }
  );
}

export {
  appendToConversation,
  chatsCollection,
  crawlingMetaDataCollection,
  dbClient,
  embeddingsCollection
};
