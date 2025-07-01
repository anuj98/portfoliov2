import styles from "@/app/components/blogCard.module.css";


interface BlogCardProps {
  url: string;
  published_at: string;
  tags: string[];
  social_image: string;
}

export default function BlogCard({ url, published_at, tags, social_image }: BlogCardProps) {
  return (
    <a className={styles.blogCard} href={url} target="_blank" rel="noopener noreferrer">
      <img src={social_image} alt="Blog cover" className={styles.blogCover} />
      <div className={styles.blogMeta}>
        {new Date(published_at).toLocaleDateString()} &middot; {tags.map((tag) => `#${tag}`).join(" ")}
      </div>
    </a>
  );
}
