import { PostForm } from "./PostForm";

export default function CreatePost() {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start w-full max-w-5xl justify-start gap-3">
          <img src="/public/assets/icons/add-post.svg"></img>
          <h2 className="h3-bold md:h2-bold w-full text-left">Create Post</h2>
        </div>
        <PostForm action="Create"></PostForm>
      </div>
    </div>
  );
}
