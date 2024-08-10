import { sql } from "@vercel/postgres";
import { Experience, Hobby, PersonalDetails } from "./models";

export async function fetchPersonalDetails() {
  try {
    const data = await sql<PersonalDetails>`
        SELECT id, 
        person_name AS name, 
        summary, 
        phno,
        email,
        linkedin,
        github,
        resume_url
        FROM personal_details;`;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch personal data.");
  }
}

export async function fetchHobbies() {
  try {
    const data = await sql<Hobby>`
        SELECT id,
        name,
        icon_url
        FROM hobbies;`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch hobbies data.");
  }
}

export async function fetchExperience() {
  try {
    const data = await sql<Experience>`
        SELECT id,
        job_title,
        company,
        location,
        details,
        start_date,
        end_date
        FROM experience;`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch experience data.");
  }
}

export async function fetchProjects() {
  try {
    const data = {
      rows: [
        {
          id: "1",
          name: "Sales Dashboard",
          technology: "Next.js, PostgreSQL, Vercel, Node, Tailwind CSS",
          summary:
            "A practice project for learning Next JS. It includes some charts and shimmer UI.",
          image_url:
            "https://vmdi8qakqy5un7sl.public.blob.vercel-storage.com/images/nextjsdashboard-bVN40lHMqpj9gymeboHysW90vtKlAN.png",
          link: "https://nextjs-dashboard-6gcautjld-anuj-upadhyayas-projects.vercel.app/",
        },
        {
          id: "2",
          name: "Personal Portfolio",
          technology: "Next.js, PostgreSQL, Vercel, Node",
          summary:
            "It is a interactive portfolio site showcasing experiences and personal achievements.",
          image_url:
            "https://vmdi8qakqy5un7sl.public.blob.vercel-storage.com/images/portfolio-qT3FGHL1l7lUJWnTWHOTkBo9Az6YcS.png",
          link: "https://portfolio-blue-mu-56.vercel.app/",
        },
      ],
    };

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch experience data.");
  }
}
