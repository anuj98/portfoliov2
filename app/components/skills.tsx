import styles from "@/app/components/skills.module.css";
import { Skill } from "@/app/db/models";

export default function Skills({ skills }: { skills: Skill[] }) {
  function getCategories(){
    let categories: string[] = skills.map((skill) => {
      return skill.category;
    });
    let uniqueCategoies = Array.from(new Set([...categories])) as string[];
    return uniqueCategoies;
  }

  function getSubCategories(category: string){
    let subCategories = skills
      .filter((skill) => skill.category === category)
      .map((skill) => skill.subcategory);
    let uniqueSubCategories = Array.from(
      new Set([...subCategories])
    ) as string[];
    return uniqueSubCategories;
  }

  function renderRatingBar(rating: number){
    let left = (rating / 5) * 100;
    let right = 100 - left;
    return (
      <div
        style={{
          background: `linear-gradient(90deg, rgb(14, 107, 51) ${left}%, rgb(153, 197, 152) ${right}%)`,
          height: "5px",
          marginTop: "10px",
          borderRadius: "10px"
        }}
      ></div>
    );
  }

  function renderSkill(name: string, rating: number){
    return (
      <div className={styles.skill_wrapper}>
        <div className={styles.skill_content}>
          <div>{name}</div>
          <>{renderRatingBar(rating)}</>
        </div>
      </div>
    );
  }

  function renderSubCategory(category: string, subCategory: string){
    let requiedSkills = skills.filter(
      (skill) =>
        skill.category === category && skill.subcategory === subCategory
    );
    return (
      <>
        <div className={styles.skillSubCategory_title}>{subCategory}</div>
        <div>
          {requiedSkills.map((skill) => (
            <div key={skill.id} className={styles.all_skills}>
              {renderSkill(skill.name, skill.rating)}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.title}>Skills</div>
      <div className={styles.description}>
        {`Throughout my journey, I've been driven by a passion for learning and
        self-improvement. Here are some of the skills I've honed along the way.`}
      </div>
      <div className={styles.wrapper}>
        {getCategories().map((category, index) => {
          return (
            <div
              key={`skill-category-${index}`}
              className={styles.skillCategory_wrapper}
            >
              <div className={styles.skillCategory_title}>{category}</div>
              <>
                {getSubCategories(category).map((subCategory) => {
                  return (
                    <div
                      key={`${category}-${subCategory}`}
                      className={styles.skillSubCategory_wrapper}
                    >
                      {renderSubCategory(category, subCategory)}
                    </div>
                  );
                })}
              </>
            </div>
          );
        })}
      </div>
    </section>
  );
}
