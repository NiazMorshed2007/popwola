import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6475ca5453bd7b131cd8");

export const account = new Account(client);
export default client;
