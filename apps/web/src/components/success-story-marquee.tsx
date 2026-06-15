import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import type { SuccessStoryEntry } from "@/lib/cms-types";
import { Marquee, Reveal } from "@/components/motion";

export function SuccessStoryMarquee({ stories }: { stories: SuccessStoryEntry[] }) {
  if (!stories.length) return null;

  const row = stories.slice(0, 8);

  return (
    <section className="v2-section v2-stories">
      <div className="v2-container">
        <div className="v2-section-head split">
          <div>
            <Reveal>
              <span className="v2-eyebrow">শিক্ষার্থীদের গল্প</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="v2-h2 font-display" style={{ marginTop: 18 }}>
                ছোট অগ্রগতিই একদিন <span className="v2-ink-accent">বড় আত্মবিশ্বাস।</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="v2-lead">
              জয়পুরহাট ব্রাঞ্চের শিক্ষার্থীরা কীভাবে ক্লাস, অনুশীলন ও ফলাফল দেখে নিজেদের শেখার পথ তৈরি করছে—সেই
              বাস্তব গল্পগুলো এখানে।
            </p>
            <Link className="v2-btn v2-btn-ink" href="/success-stories" style={{ marginTop: 22 }}>
              সব গল্প দেখুন
              <ArrowUpRight size={17} />
            </Link>
          </Reveal>
        </div>
      </div>

      <Marquee speed={44} className="v2-stories-marquee">
        {row.map((story, index) => (
          <article key={`${story.id}-${index}`} className="v2-story-card">
            <div className="ph">
              <Image
                src={story.image}
                alt={story.name}
                fill
                sizes="(max-width: 768px) 78vw, 380px"
                className="object-cover"
              />
            </div>
            <div className="body">
              <Quote className="q" size={24} />
              <span>
                {story.batch} · {story.course}
              </span>
              <h3>{story.title}</h3>
              <p>{story.excerpt}</p>
              <div className="who">
                <strong>{story.name}</strong>
                <em>{story.achievement}</em>
              </div>
            </div>
          </article>
        ))}
      </Marquee>
    </section>
  );
}
