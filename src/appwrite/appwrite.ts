import { LoginInterface, RegisterInterface } from "@/interfaces/auth.interface";
import { Client as Appwrite, Databases, Account, ID } from "appwrite";

const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;

let api: any = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let appwrite = new Appwrite();
    appwrite
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("6475ca5453bd7b131cd8");
    const account = new Account(appwrite);
    const database = new Databases(appwrite);

    api.sdk = { database, account };
    return api.sdk;
  },

  createAccount: (registerBody: RegisterInterface) => {
    return api
      .provider()
      .account.create(
        ID.unique(),
        registerBody.email,
        registerBody.password,
        registerBody.fullName
      );
  },

  getAccount: () => {
    let account = api.provider().account;
    return account.get();
  },

  createSession: (loginBody: LoginInterface) => {
    console.log("loginBody", loginBody);

    return api
      .provider()
      .account.createEmailSession(loginBody.email, loginBody.password);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession("current");
  },

  createDocument: (collectionId: string, data: JSON, permissions: any) => {
    return api
      .provider()
      .database.createDocument(
        databaseId,
        collectionId,
        "unique()",
        data,
        permissions
      );
  },

  getDocuments: (collectionId: string) => {
    return api.provider().database.listDocuments(databaseId, collectionId);
  },

  getDocument: (collectionId: string, documentId: string) => {
    return api
      .provider()
      .database.getDocument(databaseId, collectionId, documentId);
  },

  // updateDocument: (databaseId, collectionId, documentId, data) => {
  //   return api
  //     .provider()
  //     .database.updateDocument(databaseId, collectionId, documentId, data);
  // },

  // deleteDocument: (databaseId, collectionId, documentId) => {
  //   return api
  //     .provider()
  //     .database.deleteDocument(databaseId, collectionId, documentId);
  // },
};

export default api;
