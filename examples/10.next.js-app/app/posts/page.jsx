// app/posts/page.jsx
import { getPosts } from "@/lib/db";
// import { incrementLike } from "@/app/actions/postActions.js"; // Use .js
import styles from "./PostsPage.module.css";
import LikeButton from "../components/LikeButton";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Posts (Call Server Action from Client Component)</h1>
      <ul className={styles.list}>
        {posts.map(post => (
            <li key={post.id} className={styles.listItem}>
              <span>{post.title}</span>
              <LikeButton postId={post.id} initialLikes={post.likes} />
            </li>
          )
        )}
      </ul>
    </div>
  );
}
