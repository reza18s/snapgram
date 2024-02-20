import { ID, Query } from "appwrite";
import { appwriteConfig, databases, storage } from "./appwrite";
import { INewPost, IUpdatePost } from "@/types";
export async function getPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.dataBaseId,
      appwriteConfig.postCollectionsId,
    );
    return posts;
  } catch (error) {
    console.log(error);
  }
}
export async function CreatePostApi(post: INewPost) {
  try {
    const image = await UploadFile(post.file[0]);
    if (!image) return;
    const imageUrl = await getFileUrl(image?.$id);
    if (!imageUrl) {
      deleteFile(image.$id);
      return;
    }
    const tags = post.tags?.replace(/ /g, "").split(",") || [];
    const { userId, caption, location } = post;
    const newPost = await databases.createDocument(
      appwriteConfig.dataBaseId,
      appwriteConfig.postCollectionsId,
      ID.unique(),
      {
        creator: userId,
        caption,
        image: imageUrl,
        imageId: image.$id,
        location,
        tags,
      },
    );
    if (!newPost) {
      await deleteFile(image.$id);
    }

    return newPost;
  } catch (error) {
    console.log(error);
    // return null;
  }
}
export async function updatePost(post: IUpdatePost) {
  const hasFileTOUpdate = post.file.length > 0;
  try {
    let updateImage = {
      imageUrl: post.imageUrl,
      ImageId: post.imageId,
    };
    if (hasFileTOUpdate) {
      const image = await UploadFile(post.file[0]);
      if (!image) return;
      const imageUrl = await getFileUrl(image?.$id);
      if (!imageUrl) {
        deleteFile(image.$id);
        return;
      }
      updateImage = { ...updateImage, imageUrl, ImageId: image.$id };
    }

    const tags = post.tags?.replace(/ /g, "").split(",") || [];
    const { caption, location } = post;
    const newPost = await databases.createDocument(
      appwriteConfig.dataBaseId,
      appwriteConfig.postCollectionsId,
      post.postId,
      {
        caption,
        image: updateImage.imageUrl,
        imageId: updateImage.ImageId,
        location,
        tags,
      },
    );
    if (!newPost) {
      await deleteFile(post.imageId);
    }

    return newPost;
  } catch (error) {
    console.log(error);
    // return null;
  }
}
export async function UploadFile(file: File) {
  try {
    const UploadFile = await storage.createFile(
      appwriteConfig.mediaBucketsId,
      ID.unique(),
      file,
    );
    return UploadFile;
  } catch (error) {
    console.log(error);
  }
}
export async function getFileUrl(fileId: string) {
  try {
    const FileUrl = storage.getFilePreview(
      appwriteConfig.mediaBucketsId,
      fileId,
      2000,
      2000,
      "top",
      100,
    );
    return FileUrl;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteFile(fileId: string) {
  try {
    storage.deleteFile(appwriteConfig.storageId, fileId);
  } catch (error) {
    console.log(error);
  }
}
export async function likePost(postId: string, likeArray: string[]) {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.dataBaseId,
      appwriteConfig.postCollectionsId,
      postId,
      { Likes: likeArray },
    );
    if (!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}
export async function savePost(postId: string, userId: string) {
  try {
    console.log("fff");
    const updatedPost = await databases.createDocument(
      appwriteConfig.dataBaseId,
      appwriteConfig.savesCollectionsId,
      ID.unique(),
      { user: userId, post: postId },
    );
    if (!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}
export async function delSavePost(savedPostRecord: string) {
  console.log(savedPostRecord);
  try {
    const updatedPost = await databases.deleteDocument(
      appwriteConfig.dataBaseId,
      appwriteConfig.savesCollectionsId,
      savedPostRecord,
    );
    if (!updatedPost) throw Error;
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}
export async function getPostById(id: string) {
  try {
    const Posts = await databases.getDocument(
      appwriteConfig.dataBaseId,
      appwriteConfig.postCollectionsId,
      id,
    );
    return Posts;
  } catch (error) {
    console.log(error);
  }
}
export async function deletePost(postId: string) {
  // if (!postId || !imageId) throw error;

  try {
    await databases.deleteDocument(
      appwriteConfig.dataBaseId,
      appwriteConfig.postCollectionsId,
      postId,
    );
  } catch (error) {
    console.log(error);
  }
}
