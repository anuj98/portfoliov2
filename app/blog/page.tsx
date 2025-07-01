
import BlogCard from "@/app/components/blogCard";
import styles from "@/app/blog/page.module.css";
import { getDevToBlogs } from "@/app/lib/devtoService";

export default async function BlogPage() {
  let blogs = await getDevToBlogs("anuj_u");
  blogs = blogs.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
  return (
    <main className={styles.blogMain}>
      <h1 className={styles.blogTitleHeader}>Blog</h1>
      <p className={styles.blogIntro}>
        Welcome to the blog section! Here you will find articles, tutorials, and updates related to software engineering, web development, and personal projects.
      </p>
      <div className={styles.blogGrid}>
        {blogs.length === 0 && <p className={styles.blogEmpty}>(No blog posts found.)</p>}
        {blogs.map((blog: any) => (
          <BlogCard key={blog.url} {...blog} />
        ))}
      </div>
    </main>
  );
}
