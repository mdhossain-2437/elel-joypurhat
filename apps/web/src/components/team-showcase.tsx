import Image from "next/image";
import { team } from "@/lib/content";
import type { TeamMemberEntry } from "@/lib/cms-types";
import { Reveal } from "@/components/motion";

export function TeamShowcase({
  title = "জয়পুরহাট ব্রাঞ্চের দায়িত্বশীল টিম",
  eyebrow = "আমাদের টিম",
  description = "ভর্তি সহায়তা, ক্লাস পরিচালনা, প্রশিক্ষণ ও শিক্ষার্থীদের নিয়মিত পাশে থাকার কাজে আমাদের টিম দায়িত্ব নিয়ে কাজ করছে।",
  members,
}: {
  title?: string;
  eyebrow?: string;
  description?: string;
  members?: TeamMemberEntry[];
}) {
  const officers = members?.length
    ? members.filter((person) => person.category === "OFFICER")
    : team.officers.map((person, index) => ({
        ...person,
        id: person.name,
        category: "OFFICER" as const,
        status: "PUBLISHED" as const,
        sortOrder: index + 1,
        bio: "",
        updatedAt: "",
      }));
  const trainers = members?.length
    ? members.filter((person) => person.category === "TRAINER")
    : team.trainers.map((person, index) => ({
        ...person,
        id: person.name,
        org: "প্রশিক্ষণ টিম",
        category: "TRAINER" as const,
        status: "PUBLISHED" as const,
        sortOrder: index + 1,
        bio: "",
        updatedAt: "",
      }));

  return (
    <section id="team" className="v2-section">
      <div className="v2-container">
        <div className="v2-section-head split">
          <div>
            <Reveal>
              <span className="v2-eyebrow">{eyebrow}</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="v2-h2 font-display" style={{ marginTop: 18 }}>
                {title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="v2-lead">{description}</p>
          </Reveal>
        </div>

        <div className="v2-team-grid">
          {officers.map((person, index) => (
            <Reveal key={person.id} delay={index * 70} y={30}>
              <article className="v2-person">
                <div className="ph">
                  <Image src={person.image} alt={person.name} fill sizes="(max-width: 768px) 50vw, 33vw" />
                </div>
                <div className="info">
                  <span>{person.org}</span>
                  <h3>{person.name}</h3>
                  <p>{person.role}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="v2-team-grid trainers" style={{ marginTop: 16 }}>
          {trainers.map((person, index) => (
            <Reveal key={person.id} delay={index * 60} y={26}>
              <article className="v2-person">
                <div className="ph">
                  <Image src={person.image} alt={person.name} fill sizes="(max-width: 768px) 50vw, 20vw" />
                </div>
                <div className="info">
                  <span>প্রশিক্ষণ টিম</span>
                  <h3>{person.name}</h3>
                  <p>{person.role}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
