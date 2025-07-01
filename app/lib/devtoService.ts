
import { DevToBlog } from "@/app/lib/types/devto";

export async function getDevToBlogs(username: string): Promise<DevToBlog[]> {
  const res = await fetch(`https://dev.to/api/articles?username=${username}`, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((blog: any) => ({
    url: blog.url,
    published_at: blog.published_at,
    tags: blog.tag_list || [],
    social_image: blog.social_image,
  }));
}
