import Image from "next/image";
import { team } from "@/lib/content";
import type { TeamMemberEntry } from "@/lib/cms-types";

export function TeamShowcase({
  title = "জয়পুরহাট ব্রাঞ্চের দায়িত্বশীল টিম",
  eyebrow = "আমাদের টিম",
  description = "ভর্তি সহায়তা, ক্লাস পরিচালনা, প্রশিক্ষণ ও শিক্ষার্থীদের নিয়মিত পাশে থাকার কাজে আমাদের টিম দায়িত্ব নিয়ে কাজ করছে।",
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
    <section id="team" className="section-light team-showcase">
      <div className="site-container">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="kicker-light">{eyebrow}</p>
            <h2 className="section-heading mt-4">{title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-zinc-600">{description}</p>
        </div>

        <div className="team-lead-grid mt-10">
          {officers.map((person) => (
            <article key={person.id} className="team-card team-card-large">
              <div className="team-photo">
                <Image src={person.image} alt={person.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div>
                <span>{person.org}</span>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="team-trainer-grid mt-5">
          {trainers.map((person) => (
            <article key={person.id} className="team-card">
              <div className="team-photo trainer-photo">
                <Image src={person.image} alt={person.name} fill sizes="(max-width: 768px) 50vw, 20vw" className="object-cover" />
              </div>
              <div>
                <span>প্রশিক্ষণ টিম</span>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
