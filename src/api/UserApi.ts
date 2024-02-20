import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./appwrite";
import { ID, Query } from "appwrite";
import toast from "react-hot-toast";
export async function createUserApi(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(user.name);
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    toast.error("something went wrong please try again later");
    return;
  }
}
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.dataBaseId,
      appwriteConfig.userCollectionsId,
      ID.unique(),
      user,
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function singInAccount(user: { email: string; password: string }) {
  try {
    const { email, password } = user;
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (err) {
    console.log(err);
  }
}

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (currentAccount == null) throw Error;
    const currentUser = await databases.listDocuments(
      appwriteConfig.dataBaseId,
      appwriteConfig.userCollectionsId,
      [Query.equal("accountId", currentAccount.$id)],
    );
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
  }
}
