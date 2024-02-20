import { useParams } from "react-router";
import { PostForm } from "./PostForm";
import { useGetPostById } from "./useGetPostById";
import Loader from "@/components/shared/Loader";
export default function EditPost() {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostById(id || "");
  if (isLoading) return <Loader></Loader>;
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start w-full max-w-5xl justify-start gap-3">
          <img src="/public/assets/icons/add-post.svg"></img>
          <h2 className="h3-bold md:h2-bold w-full text-left">Create Post</h2>
        </div>
        <PostForm action="Update" post={post}></PostForm>
      </div>
    </div>
  );
}
