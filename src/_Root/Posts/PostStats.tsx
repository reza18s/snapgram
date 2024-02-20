import React, { useEffect, useState } from "react";
import { Models } from "appwrite";
import { useDelSavePost, useLikePost, useSavePost } from "./useUpdatePost";
import { useUser } from "@/_auth/useUser";
import { useLocation } from "react-router";
import { checkIsLiked } from "@/lib/utils";
import Loader from "@/components/shared/Loader";
type PostStatsProps = {
  post: Models.Document;
  userId: string;
};
export default function PostStats({ post, userId }: PostStatsProps) {
  const location = useLocation();
  const likesList = post.Likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSaveing } = useSavePost();
  const { mutate: delSavePost, isPending: isDeiSave } = useDelSavePost();
  const { CurrentUser } = useUser();
  const savedPostRecord = CurrentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id,
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [CurrentUser, savedPostRecord]);

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    let likeArray = [...likes];

    if (likeArray.includes(userId)) {
      likeArray = likeArray.filter((Id) => Id !== userId);
      console.log("fff");
    } else {
      likeArray.push(userId);
      console.log("ddd");
    }
    setLikes(likeArray);
    // console.log(likeArray);
    likePost({ postId: post.$id, likeArray });
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    // const savedPostRecord = CurrentUser?.save.find(
    //   (record: Models.Document) => record.$id === post.$id,
    // );
    // console.log(savedPostRecord);
    if (savedPostRecord) {
      setIsSaved(false);

      return delSavePost(savedPostRecord.$id);
    }

    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };

  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div
      className={`z-20 flex items-center justify-between ${containerStyles}`}
    >
      <div className="mr-5 flex gap-2">
        <img
          src={`${
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={(e) => handleLikePost(e)}
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        {isDeiSave || isSaveing ? (
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="share"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        ) : (
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="share"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={(e) => handleSavePost(e)}
          />
        )}
      </div>
    </div>
  );
}
