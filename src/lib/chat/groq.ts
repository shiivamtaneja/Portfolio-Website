import Groq from "groq-sdk";
import { serverEnv } from "../env/server";

export const groq = new Groq({ apiKey: serverEnv().GROQ_API_KEY });
