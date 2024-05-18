const { db } = require("@vercel/postgres");
const { randomUUID } = require("crypto");

async function seedPersonalDetails(client, data) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS personal_details`;

    // Create "personal_details" table if it does not exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS personal_details(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    person_name VARCHAR(100) NOT NULL,
    summary VARCHAR(255) NOT NULL,
    phno VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    linkedin VARCHAR(255) NOT NULL,
    github VARCHAR(255) NOT NULL,
    resume_url VARCHAR(255) NOT NULL
    )`;

    console.log("Created 'personal_details' table successfully");

    // Insert data into the "personal_details" table
    const id = randomUUID();
    const insertedUsers = await client.sql`
          INSERT INTO personal_details (id, person_name, summary, phno, email, linkedin, github, resume_url)
          VALUES (${id}, ${data["person_name"]}, ${data["summary"]}, ${data["phno"]}, ${data["email"]}, ${data["linkedin"]}, ${data["github"]}, ${data["resume_url"]})
          ON CONFLICT (id) DO NOTHING;
        `;

    console.log(`Seeded personal details`);

    return {
      createTable,
      personal_details: insertedUsers,
    };
  } catch (error) {
    console.log("Error seeding personal details", error);
    throw error;
  }
}

async function seedExperience(client, data) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS experience`;

    // Create "experience" table if it does not exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS experience(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    job_title VARCHAR(100) NOT NULL,
    company VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    details TEXT NOT NULL,
    start_date VARCHAR(20) NOT NULL,
    end_date VARCHAR(20) NOT NULL
    )`;

    console.log("Created 'experience' table successfully");

    // Insert data into the "experience" table
    const insertedExperiences = await Promise.all(
      data.map((d) => {
        const id = randomUUID();
        return client.sql`
        INSERT INTO experience (id, job_title, company, location, details, start_date, end_date)
        VALUES (${id}, ${d["job_title"]}, ${d["company"]}, ${d["location"]}, ${d["details"]}, ${d["start_date"]}, ${d["end_date"]})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedExperiences.length} experiences`);

    return {
      createTable,
      experience: insertedExperiences,
    };
  } catch (error) {
    console.log("Error seeding experiences", error);
    throw error;
  }
}

async function seedHobbies(client, data) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS hobbies`;

    // Create "personal_details" table if it does not exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS hobbies(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon_url VARCHAR(255) NOT NULL
    )`;

    console.log("Created 'hobbies' table successfully");

    // Insert data into the "hobbies" table
    const insertedHobbies = await Promise.all(
      data.map((d) => {
        const id = randomUUID();
        return client.sql`
          INSERT INTO hobbies (id, name, icon_url)
          VALUES (${id}, ${d["name"]}, ${d["icon_url"]})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedHobbies.length} hobbies`);

    return {
      createTable,
      hobbies: insertedHobbies,
    };
  } catch (error) {
    console.log("Error seeding hobbies", error);
    throw error;
  }
}

async function main() {
  const response = await fetch(
    "https://vmdi8qakqy5un7sl.public.blob.vercel-storage.com/portfolio-data.json"
  );
  const data = await response.json();

  const client = await db.connect();
  await seedPersonalDetails(client, data["personal_details"]);
  await seedExperience(client, data["experience"]);
  await seedHobbies(client, data["hobbies"]);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
