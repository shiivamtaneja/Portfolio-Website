import MemoryClient from "mem0ai";
import { serverEnv } from "../env/server";

export const memoryClient = new MemoryClient({
  apiKey: serverEnv().MEM0_API_KEY,
});
