import Loader from "@/components/shared/Loader";
import { usePost } from "../Posts/usePosts";
import { Models } from "appwrite";
import PostCard from "../Posts/PostCard";

export default function Home() {
  const { posts, isLoading } = usePost();
  return (
    <div className="flex-1 flex ">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold w-full text-left">Home Feed</h2>
          {isLoading && !posts ? (
            <Loader className="h-32"></Loader>
          ) : (
            <ul className="flex w-full flex-1 flex-col gap-9">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.$id}></PostCard>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
{
  /* <div className="flex flex-1">
  <div className="home-container">
    <div className="home-posts">
      <h2 className="h3-bold md:h2-bold w-full text-left">Home Feed</h2>
      {isPostLoading && !posts ? (
        <Loader />
      ) : (
        <ul className="flex w-full flex-1 flex-col gap-9 ">
          {posts?.documents.map((post: Models.Document) => (
            <li key={post.$id} className="flex w-full justify-center">
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>

  <div className="home-creators">
    <h3 className="h3-bold text-light-1">Top Creators</h3>
    {isUserLoading && !creators ? (
      <Loader />
    ) : (
      <ul className="grid gap-6 2xl:grid-cols-2">
        {creators?.documents.map((creator) => (
          <li key={creator?.$id}>
            <UserCard user={creator} />
          </li>
        ))}
      </ul>
    )}
  </div>
</div>; */
}
