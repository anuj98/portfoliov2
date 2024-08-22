export interface Hobby {
    id: string;
    name: string;
    icon_url: string;
}

export interface Experience {
    id: string;
    job_title: string;
    company: string;
    location: string;
    details: string;
    start_date: string;
    end_date: string;
}

export interface Detail {
    project_summary: string;
    work_done: string[];
    technology: string;
}

export interface PersonalDetails {
    id: string;
    name: string;
    summary: string;
    phno: string;
    email: string;
    linkedin: string;
    github: string;
    resume_url: string;
}

export interface Project {
    id: string;
    name: string;
    technology: string;
    summary: string;
    image_url: string;
    link: string;
    github: string;
}

export interface Skill {
    id: string;
    name: string;
    rating: number;
    category: string;
    subcategory: string;
}