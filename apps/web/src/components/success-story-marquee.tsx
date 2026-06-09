import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import type { SuccessStoryEntry } from "@/lib/cms-types";

export function SuccessStoryMarquee({ stories }: { stories: SuccessStoryEntry[] }) {
  if (!stories.length) return null;

  const marqueeStories = [...stories.slice(0, 6), ...stories.slice(0, 6)];

  return (
    <section className="success-story-section">
      <div className="site-container success-story-head">
        <div>
          <p className="kicker-light">শিক্ষার্থীদের গল্প</p>
          <h2 className="section-heading mt-4">ক্লাসের ভেতরের ছোট অগ্রগতিই একদিন বড় আত্মবিশ্বাস হয়।</h2>
        </div>
        <div className="success-story-copy">
          <p>
            জয়পুরহাট ব্রাঞ্চের শিক্ষার্থীরা কীভাবে ক্লাস, অনুশীলন, ফিডব্যাক ও ফলাফল দেখে নিজেদের শেখার পথ তৈরি করছে—সেই বাস্তব গল্পগুলো এখানে রাখা হচ্ছে।
          </p>
          <Link href="/success-stories">
            সব গল্প দেখুন
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>

      <div className="story-marquee-shell" aria-label="শিক্ষার্থীদের সাফল্যের গল্প">
        <div className="story-marquee-track">
          {marqueeStories.map((story, index) => (
            <article key={`${story.id}-${index}`} className="story-marquee-card">
              <div className="story-photo-wrap">
                <Image src={story.image} alt={story.name} fill sizes="(max-width: 768px) 74vw, 360px" className="object-cover" />
              </div>
              <div className="story-card-body">
                <Quote size={22} />
                <span>{story.batch} / {story.course}</span>
                <h3>{story.title}</h3>
                <p>{story.excerpt}</p>
                <strong>{story.name}</strong>
                <em>{story.achievement}</em>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
