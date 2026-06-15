import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { getPublishedSuccessStories } from "@/lib/cms-store";
import { Reveal } from "@/components/motion";

export const metadata = {
  title: "শিক্ষার্থীদের গল্প",
  description: "ই-লার্নিং এন্ড আর্নিং জয়পুরহাট ব্রাঞ্চের শিক্ষার্থীদের শেখার অভিজ্ঞতা, অগ্রগতি ও সাফল্যের গল্প।",
};

export const dynamic = "force-dynamic";

const pageSize = 9;

type StoriesPageProps = {
  searchParams?: Promise<{ page?: string }>;
};

export default async function SuccessStoriesPage({ searchParams }: StoriesPageProps) {
  const params = await searchParams;
  const stories = await getPublishedSuccessStories();
  const totalPages = Math.max(1, Math.ceil(stories.length / pageSize));
  const currentPage = Math.min(Math.max(Number(params?.page || 1) || 1, 1), totalPages);
  const start = (currentPage - 1) * pageSize;
  const visibleStories = stories.slice(start, start + pageSize);

  return (
    <main className="v2">
      <section className="v2-page-hero">
        <div className="v2-hero-aurora" />
        <div className="v2-container">
          <Reveal>
            <span className="v2-eyebrow">শিক্ষার্থীদের গল্প</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="v2-display font-display">
              প্রতিদিনের <span className="v2-ink-accent">অগ্রগতির প্রমাণ।</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="v2-lead">
              নিয়মিত ক্লাস, ল্যাব অনুশীলন, প্রশিক্ষকের ফিডব্যাক ও নিজের চেষ্টা মিলিয়ে শিক্ষার্থীরা কীভাবে
              এগোচ্ছে—এই পেজে সেই গল্পগুলো সংরক্ষণ করা হয়েছে।
            </p>
          </Reveal>
        </div>
      </section>

      <section className="v2-section tight">
        <div className="v2-container">
          <div className="v2-card-grid cols-3">
            {visibleStories.map((story, index) => (
              <Reveal key={story.id} delay={(index % 3) * 80} y={30}>
                <article className="v2-story-card" style={{ width: "auto", marginRight: 0 }}>
                  <div className="ph">
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="body">
                    <Quote className="q" size={22} />
                    <span>
                      {story.batch} · {story.course}
                    </span>
                    <h3>{story.title}</h3>
                    <p>{story.story}</p>
                    <div className="who">
                      <strong>{story.name}</strong>
                      <em>{story.achievement}</em>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <nav className="v2-pagination" aria-label="শিক্ষার্থীদের গল্পের পেজ বাছাই">
            <Link
              className={`v2-btn v2-btn-ghost ${currentPage <= 1 ? "is-disabled" : ""}`}
              href={currentPage <= 1 ? "/success-stories?page=1" : `/success-stories?page=${currentPage - 1}`}
              aria-disabled={currentPage <= 1}
            >
              <ArrowLeft size={16} />
              আগের পেজ
            </Link>
            <span>
              পেজ {currentPage} / {totalPages}
            </span>
            <Link
              className={`v2-btn v2-btn-ghost ${currentPage >= totalPages ? "is-disabled" : ""}`}
              href={
                currentPage >= totalPages
                  ? `/success-stories?page=${totalPages}`
                  : `/success-stories?page=${currentPage + 1}`
              }
              aria-disabled={currentPage >= totalPages}
            >
              পরের পেজ
              <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
