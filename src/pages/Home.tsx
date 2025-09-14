import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useArticles } from "@/hooks/useArticles";
import { useMagazines } from "@/hooks/useMagazines";
import { useSettings } from "@/hooks/useSettings";
import { Calendar, ChevronRight, Newspaper, Star, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function imgOf(a: any) { return a?.image_url || "/placeholder.svg"; }
function titleOf(a: any) { return a?.title || "Untitled"; }
function slugOf(a: any) { return a?.slug || ""; }
function dateOf(a: any) {
  const d = a?.date ? new Date(a.date) : null;
  return d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
}
function categoryOf(a: any) { return a?.category || "Business"; }
function excerptOf(a: any) { return a?.excerpt || ""; }

const Home = () => {
  const { data: rawArticles = [] } = useArticles();
  const { data: rawMagazines = [] } = useMagazines();
  const { settings } = useSettings();

  const articles = Array.isArray(rawArticles) ? rawArticles : [];
  const magazines = Array.isArray(rawMagazines) ? rawMagazines : [];

  const { main, secondary, headlines, mostRead, latestGrid, latestMagazine } = useMemo(() => {
    const byDate = [...articles].filter(Boolean).sort((a, b) => new Date(b?.date || 0).getTime() - new Date(a?.date || 0).getTime());
    const featuredFirst = [...byDate].sort((a, b) => (b?.featured ? 1 : 0) - (a?.featured ? 1 : 0));
    const main = featuredFirst[0];
    const secondary = featuredFirst.slice(1, 3);
    const headlines = featuredFirst.slice(3, 11);
    const mostRead = byDate.slice(0, 6);
    const latestGrid = byDate.slice(11, 15);
    const latestMagazine = magazines[0] || null;
    return { main, secondary, headlines, mostRead, latestGrid, latestMagazine };
  }, [articles, magazines]);

  return (
    <div className="min-h-screen bg-white">
      {/* Headline ticker */}
      <div className="bg-insightBlack text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-insightRed text-white text-xs font-bold uppercase tracking-wide">
              <Newspaper className="w-3 h-3 mr-1" /> Latest
            </span>
            <div className="relative flex-1 overflow-hidden">
              <div className="whitespace-nowrap animate-marquee">
                {[...(headlines.length ? headlines : articles.slice(0, 8))].map((a: any, i: number) => (
                  <Link key={slugOf(a) + i} to={`/article/${slugOf(a)}`} className="inline-flex items-center text-sm text-white/90 hover:text-white mx-6">
                    {titleOf(a)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HERO split */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left rail: Most Read */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-200 font-semibold uppercase tracking-wide text-sm text-insightBlack">Most Read</div>
              <ul className="divide-y divide-gray-200">
                {mostRead.map((a: any, i: number) => (
                  <li key={slugOf(a) + i} className="p-4 hover:bg-white transition">
                    <Link to={`/article/${slugOf(a)}`} className="flex gap-3 group">
                      <img src={imgOf(a)} alt={titleOf(a)} className="w-16 h-16 rounded object-cover flex-shrink-0" />
                      <div>
                        <div className="text-xs text-gray-500 mb-1">{categoryOf(a)}</div>
                        <h4 className="font-semibold group-hover:text-insightRed line-clamp-2">{titleOf(a)}</h4>
                        <div className="text-xs text-gray-500 mt-1">{dateOf(a)}</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Center: Main Feature */}
          <div className="lg:col-span-6 space-y-6">
            {main && (
              <Link to={`/article/${slugOf(main)}`} className="block group rounded-2xl overflow-hidden shadow-lg">
                <div className="relative aspect-[16/9]">
                  <img src={imgOf(main)} alt={titleOf(main)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/>
                  <div className="absolute bottom-0 p-6 text-white">
                    <div className="inline-flex px-3 py-1 rounded bg-insightRed text-white text-xs font-bold mb-3">{categoryOf(main)}</div>
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2">{titleOf(main)}</h1>
                    <p className="text-white/85 line-clamp-2">{excerptOf(main)}</p>
                  </div>
                </div>
              </Link>
            )}

            {/* Headlines list under hero */}
            <div className="bg-gray-50 rounded-xl border border-gray-200">
              <div className="px-5 py-3 border-b border-gray-200 font-semibold uppercase tracking-wide text-sm text-insightBlack">Latest Headlines</div>
              <ul className="divide-y divide-gray-200">
                {headlines.map((a: any, i: number) => (
                  <li key={slugOf(a) + i} className="p-4 hover:bg-white transition">
                    <Link to={`/article/${slugOf(a)}`} className="flex items-start gap-4 group">
                      <span className="mt-1 inline-block w-6 h-6 rounded-full bg-insightRed/10 text-insightRed text-xs font-bold flex items-center justify-center">{i + 1}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold group-hover:text-insightRed line-clamp-2">{titleOf(a)}</h4>
                        <div className="text-xs text-gray-500 mt-1">{dateOf(a)}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-insightRed"/>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Secondary cards + Magazine promo */}
          <aside className="lg:col-span-3 space-y-6">
            {secondary.map((a: any, i: number) => (
              <Link key={slugOf(a) + i} to={`/article/${slugOf(a)}`} className="block group rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition">
                <div className="relative aspect-video">
                  <img src={imgOf(a)} alt={titleOf(a)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 p-4 text-white">
                    <div className="inline-flex px-2 py-0.5 rounded bg-insightRed text-white text-[10px] font-bold mb-2">{categoryOf(a)}</div>
                    <h3 className="text-lg font-bold leading-snug line-clamp-2">{titleOf(a)}</h3>
                  </div>
                </div>
              </Link>
            ))}

            <Card className="overflow-hidden">
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={latestMagazine?.cover_image_url || "/placeholder.svg"} alt={latestMagazine?.title || "Latest Magazine"} className="w-full h-full object-cover"/>
                </div>
                <Badge className="absolute top-3 left-3 bg-insightRed text-white">Latest Issue</Badge>
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-1">{latestMagazine?.title || "Read our latest issue"}</h4>
                <Link to={latestMagazine?.slug ? `/magazine/${latestMagazine.slug}` : "/magazine"} className="inline-flex items-center text-insightRed hover:text-insightBlack text-sm font-medium">
                  Read Now <ChevronRight className="ml-1 h-4 w-4"/>
                </Link>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>

      {/* Latest grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-insightBlack">Editor's Picks</h2>
            <Link to="/articles" className="text-sm font-semibold text-insightRed hover:text-insightBlack">View all</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestGrid.map((a: any, i: number) => (
              <Card key={slugOf(a) + i} className="group overflow-hidden hover:shadow-lg transition">
                <div className="relative aspect-video">
                  <img src={imgOf(a)} alt={titleOf(a)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2 py-0.5 bg-white/90 text-insightBlack text-xs font-semibold rounded">
                      {categoryOf(a)}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-insightRed">{titleOf(a)}</h3>
                  <div className="text-xs text-gray-500 flex items-center gap-2"><Calendar className="h-3 w-3"/>{dateOf(a)}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-insightRed text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-3">Subscribe to {settings.companyName}</h3>
            <p className="text-white/90 mb-5">Monthly strategies and interviews for leaders. No noise, just signal.</p>
            <Link to="/magazine">
              <Button size="lg" className="bg-white text-insightRed hover:bg-gray-100">
                <BookOpen className="mr-2 h-5 w-5"/> Explore Issues
              </Button>
            </Link>
          </div>
          <div className="hidden lg:block justify-self-end">
            <img src={latestMagazine?.cover_image_url || "/placeholder.svg"} alt="Latest" className="w-64 rounded-lg shadow-2xl -rotate-6"/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
