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
        technology,
        start_date,
        end_date
        FROM experience;`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch experience data.");
  }
}
