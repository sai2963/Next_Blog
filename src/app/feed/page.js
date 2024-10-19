
import { Suspense } from 'react';
import GetPosts from '@/components/getposts';
import Blog_Posts from "@/components/blog_posts";
import PremiumLoadingPage from './loading';

const Posts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">All Posts</h1>
        <Suspense fallback={<PremiumLoadingPage/>}>
          <PostsContent />
        </Suspense>
      </div>
    </div>
  );
};

const PostsContent =async () => {
  const posts = await GetPosts;
  return <Blog_Posts posts={posts} />;
};

export default Posts;

export const metadata = {
  title: "Posts",
  description: "Here you can get all the blogData",
};