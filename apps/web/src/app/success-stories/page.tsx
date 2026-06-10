import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { getPublishedSuccessStories } from "@/lib/cms-store";

export const metadata = {
  title: "শিক্ষার্থীদের গল্প",
  description: "ই-লার্নিং এন্ড আর্নিং জয়পুরহাট ব্রাঞ্চের শিক্ষার্থীদের শেখার অভিজ্ঞতা, অগ্রগতি ও সাফল্যের গল্প।",
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
    <main className="site-shell">
      <section className="story-index-hero">
        <div className="site-container story-index-head">
          <p className="kicker-light">শিক্ষার্থীদের গল্প</p>
          <h1 className="hero-heading mt-5 max-w-5xl">শেখার গল্পগুলো শুধু ফলাফল নয়, প্রতিদিনের <span className="accent">অগ্রগতির</span> প্রমাণ।</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-700">
            নিয়মিত ক্লাস, ল্যাব অনুশীলন, প্রশিক্ষকের ফিডব্যাক ও নিজের চেষ্টা মিলিয়ে শিক্ষার্থীরা কীভাবে এগোচ্ছে—এই পেজে সেই গল্পগুলো সংরক্ষণ করা হয়েছে।
          </p>
        </div>
      </section>

      <section className="section-white">
        <div className="site-container">
          <div className="story-grid">
            {visibleStories.map((story) => (
              <article key={story.id} className="story-index-card">
                <div className="story-index-photo">
                  <Image src={story.image} alt={story.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="story-index-body">
                  <Quote size={22} />
                  <span>{story.batch} / {story.course}</span>
                  <h2>{story.title}</h2>
                  <p>{story.story}</p>
                  <div>
                    <strong>{story.name}</strong>
                    <em>{story.achievement}</em>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <nav className="story-pagination" aria-label="শিক্ষার্থীদের গল্পের পেজ বাছাই">
            <Link
              className={currentPage <= 1 ? "disabled" : ""}
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
              className={currentPage >= totalPages ? "disabled" : ""}
              href={currentPage >= totalPages ? `/success-stories?page=${totalPages}` : `/success-stories?page=${currentPage + 1}`}
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
