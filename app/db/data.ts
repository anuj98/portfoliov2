import { sql } from "@vercel/postgres";
import { Experience, Hobby, PersonalDetails, Project, Skill } from "./models";

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
    const data = await sql<Project>`
        SELECT id,
        name,
        technology,
        summary,
        image_url,
        link,
        github
        FROM projects;`;
    console.log("Projects Data:", data.rows);
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch projects data.");
  }
}

export async function fetchSkills() {
  try {
    const data = await sql<Skill>`
        SELECT id,
        name,
        rating,
        category,
        subCategory
        FROM skills;`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch skills data.");
  }
}
