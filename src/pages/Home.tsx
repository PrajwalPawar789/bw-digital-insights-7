import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useArticles, useFeaturedArticles } from "@/hooks/useArticles";
import { useMagazines } from "@/hooks/useMagazines";
import { useLeadershipProfiles } from "@/hooks/useLeadership";
import { usePressReleases } from "@/hooks/usePressReleases";
import { useSettings } from "@/hooks/useSettings";
import { Calendar, ChevronRight, Newspaper, BookOpen, ArrowRight, Users, Briefcase, Layers, Shield, TrendingUp, LineChart, Target, Handshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
  const { data: rawArticles = [], isLoading: articlesLoading } = useArticles();
  const { data: rawMagazines = [], isLoading: magazinesLoading } = useMagazines();
  const { data: featured = [] } = useFeaturedArticles();
  const { settings } = useSettings();
  const { data: leadership = [] } = useLeadershipProfiles();
  const { data: press = [] } = usePressReleases();

  const articles = Array.isArray(rawArticles) ? rawArticles : [];
  const magazines = Array.isArray(rawMagazines) ? rawMagazines : [];

  const { main, secondary, headlines, mostRead, latestGrid, latestMagazine } = useMemo(() => {
    const byDate = [...articles].filter(Boolean).sort((a, b) => new Date(b?.date || 0).getTime() - new Date(a?.date || 0).getTime());
    const featuredFirst = [...byDate].sort((a, b) => (b?.featured ? 1 : 0) - (a?.featured ? 1 : 0));
    const main = featuredFirst[0];
    const secondary = featuredFirst.slice(1, 3);
    const headlines = featuredFirst.slice(3, 11);
    const mostRead = byDate.slice(0, 5);
    const latestGrid = byDate.slice(11, 15);
    const latestMagazine = magazines[0] || null;
    return { main, secondary, headlines, mostRead, latestGrid, latestMagazine };
  }, [articles, magazines]);

  const { supportingStories, insightStories, leadershipSpotlight, pressHighlights } = useMemo(() => {
    const sorted = [...articles]
      .filter(Boolean)
      .sort((a: any, b: any) => new Date(b?.date || 0).getTime() - new Date(a?.date || 0).getTime());

    const supportingStories = sorted.slice(1, 4);
    const insightStories = (featured && featured.length ? featured : sorted.slice(4, 10)).slice(0, 6);
    const leadershipSpotlight = (leadership || []).slice(0, 3);
    const pressHighlights = (press || []).slice(0, 3);

    return { supportingStories, insightStories, leadershipSpotlight, pressHighlights };
  }, [articles, featured, leadership, press]);

  const growthPillars = [
    {
      title: "People",
      description: "Build cultures where experts feel seen, heard, and empowered to challenge the status quo.",
      icon: Users,
    },
    {
      title: "Culture",
      description: "Translate purpose into everyday rituals that keep innovation grounded in shared values.",
      icon: Briefcase,
    },
    {
      title: "Process",
      description: "Engineer repeatable momentum with systems that scale from pilot programs to global rollouts.",
      icon: Layers,
    },
    {
      title: "Accountability",
      description: "Measure what matters, celebrate responsible risk-taking, and close every learning loop.",
      icon: Shield,
    },
  ];

  const flywheelSignals = [
    {
      icon: TrendingUp,
      title: "Where growth comes from",
      description: "Growth is earned when the stories of current customers become the playbook for the next wave of relationships.",
    },
    {
      icon: Handshake,
      title: "New customers follow actions",
      description: "Your next loyal reader, subscriber, or partner arrives because a past customer shared a proof point that felt personal and actionable.",
    },
    {
      icon: Target,
      title: "Design the follow-through",
      description: "Map the journeys, automate the nudges, and deliver experiences that transform curiosity into unwavering trust.",
    },
  ];

  if (articlesLoading || magazinesLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-insightRed mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Premium News Ticker */}
      <div className="bg-insightBlack text-white overflow-hidden border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-3">
            <Badge className="bg-insightRed text-white hover:bg-insightRed/90 font-semibold uppercase tracking-wider">
              <Newspaper className="w-3.5 h-3.5 mr-1.5" /> Breaking News
            </Badge>
            <div className="relative flex-1 overflow-hidden">
              <div className="whitespace-nowrap animate-marquee">
                {[...(headlines.length ? headlines : articles.slice(0, 8))].map((a: any, i: number) => (
                  <Link 
                    key={slugOf(a) + i} 
                    to={`/article/${slugOf(a)}`} 
                    className="inline-flex items-center text-sm text-white/90 hover:text-white transition-colors mx-8 font-medium"
                  >
                    {titleOf(a)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Premium Content Focus */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Featured Story */}
            <div className="lg:col-span-8 space-y-6">
              {main ? (
                <article className="group">
                  <Link to={`/article/${slugOf(main)}`} className="block">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-insightBlack">
                      <div className="aspect-[16/9] bg-gradient-to-br from-gray-900 to-insightBlack flex items-center justify-center">
                        <img 
                          src={imgOf(main)} 
                          alt={titleOf(main)} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-insightBlack/90 via-insightBlack/40 to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <Badge className="bg-insightRed text-white mb-4 font-bold uppercase tracking-wider">
                          {categoryOf(main)}
                        </Badge>
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-4 group-hover:text-insightRed/90 transition-colors">
                          {titleOf(main)}
                        </h1>
                        <p className="text-white/90 text-lg mb-4 line-clamp-2 max-w-3xl">
                          {excerptOf(main)}
                        </p>
                        <div className="flex items-center gap-4 text-white/70 text-sm">
                          <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {dateOf(main)}
                          </span>
                          <span>•</span>
                          <span>{main?.author || "Editorial Team"}</span>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {secondary.map((a: any, i: number) => (
                      <Link 
                        key={slugOf(a) + i} 
                        to={`/article/${slugOf(a)}`} 
                        className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden">
                          <img 
                            src={imgOf(a)} 
                            alt={titleOf(a)} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          />
                        </div>
                        <div className="p-5">
                          <Badge variant="outline" className="mb-2 text-xs">
                            {categoryOf(a)}
                          </Badge>
                          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-insightRed transition-colors mb-2">
                            {titleOf(a)}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                            {excerptOf(a)}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            {dateOf(a)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </article>
              ) : (
                <div className="text-center py-12 text-gray-500">No featured articles available</div>
              )}
            </div>

            {/* Right Sidebar - Magazine & Trending */}
            <aside className="lg:col-span-4 space-y-6">
              {latestMagazine && (
                <div className="bg-gradient-to-br from-insightBlack to-gray-900 rounded-2xl p-6 text-white shadow-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-5 w-5 text-insightRed" />
                    <h3 className="font-bold text-lg uppercase tracking-wider">Latest Issue</h3>
                  </div>
                  <Link to="/magazine" className="block group">
                    <div className="relative rounded-xl overflow-hidden mb-4 shadow-2xl">
                      <img 
                        src={latestMagazine.cover_image_url || "/placeholder.svg"} 
                        alt={latestMagazine.title || "Latest Magazine"} 
                        className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h4 className="font-bold text-xl mb-2 group-hover:text-insightRed transition-colors">
                      {latestMagazine.title}
                    </h4>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">
                      {latestMagazine.description}
                    </p>
                    <Button className="w-full bg-insightRed hover:bg-insightRed/90 text-white font-semibold">
                      Read Magazine <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}

              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="font-bold uppercase tracking-wider text-sm text-insightBlack">
                    Most Read Today
                  </h3>
                </div>
                <ul className="divide-y divide-gray-100">
                  {mostRead.slice(0, 5).map((a: any, i: number) => (
                    <li key={slugOf(a) + i} className="hover:bg-gray-50 transition-colors">
                      <Link to={`/article/${slugOf(a)}`} className="flex gap-4 p-4 group">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-insightRed/10 text-insightRed font-bold flex items-center justify-center text-sm">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <Badge variant="outline" className="mb-1.5 text-xs">
                            {categoryOf(a)}
                          </Badge>
                          <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-insightRed transition-colors mb-1">
                            {titleOf(a)}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            {dateOf(a)}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Editor's Picks */}
      <section className="py-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-insightBlack">Editor's Picks</h2>
            <Link to="/articles" className="text-sm font-semibold text-insightRed hover:text-insightBlack">View all</Link>
          </div>

          <div className="flex gap-4 overflow-x-auto py-2 -mx-4 px-4">
            {(featured && featured.length ? featured : latestGrid).map((a:any,i:number)=>(
              <Link key={slugOf(a)+i} to={`/article/${slugOf(a)}`} className="min-w-[260px] max-w-[320px] bg-white rounded-lg shadow group overflow-hidden">
                <div className="aspect-[16/10] bg-black flex items-center justify-center">
                  <img src={imgOf(a)} alt={titleOf(a)} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <div className="text-xs text-gray-500 mb-1">{categoryOf(a)}</div>
                  <h3 className="font-semibold line-clamp-2 group-hover:text-insightRed">{titleOf(a)}</h3>
                  <div className="text-xs text-gray-400 mt-2 flex items-center gap-2"><Calendar className="h-3 w-3"/>{dateOf(a)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Stories */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-insightBlack">Top Stories</h2>
            <Link to="/articles" className="text-sm font-semibold text-insightRed hover:text-insightBlack">See all</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(() => {
              const sorted = [...articles].filter(Boolean).sort((a:any,b:any)=>new Date(b?.date||0).getTime()-new Date(a?.date||0).getTime());
              const top = sorted.slice(0,6);
              return top.map((a:any,i:number)=> (
                <Link key={slugOf(a)+i} to={`/article/${slugOf(a)}`}>
                  <Card className="overflow-hidden group hover:shadow-lg transition">
                    <div className="aspect-[16/10] bg-black flex items-center justify-center">
                      <img src={imgOf(a)} alt={titleOf(a)} className="w-full h-full object-contain"/>
                    </div>
                    <CardContent className="pt-4">
                      <div className="text-xs text-gray-500 mb-1">{categoryOf(a)}</div>
                      <h3 className="font-semibold line-clamp-2 group-hover:text-insightRed">{titleOf(a)}</h3>
                      <div className="text-xs text-gray-400 mt-2 flex items-center gap-2"><Calendar className="h-3 w-3"/>{dateOf(a)}</div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            })()}
          </div>
        </div>
      </section>

      {/* Category sections */}
      <section className="py-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(() => {
              const sorted = [...articles].filter(Boolean).sort((a:any,b:any)=>new Date(b?.date||0).getTime()-new Date(a?.date||0).getTime());
              const cats = Array.from(new Set(sorted.map(s=>s.category).filter(Boolean))).slice(0,3);
              return cats.map((cat:string)=> {
                const items = sorted.filter(s=>s.category===cat).slice(0,4);
                return (
                  <div key={cat} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-lg">{cat}</h4>
                      <Link to={`/category/${encodeURIComponent(cat)}`} className="text-sm text-insightRed">View all</Link>
                    </div>
                    <div className="space-y-3">
                      {items.map((it:any,i:number)=> (
                        <Link key={slugOf(it)+i} to={`/article/${slugOf(it)}`} className="flex items-center gap-3 group">
                          <img src={imgOf(it)} alt={titleOf(it)} className="w-20 h-14 object-contain bg-black rounded"/>
                          <div>
                            <h5 className="font-medium line-clamp-2 group-hover:text-insightRed">{titleOf(it)}</h5>
                            <div className="text-xs text-gray-400">{dateOf(it)}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-insightBlack line-clamp-2">{titleOf(story)}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3 flex-1">{excerptOf(story)}</p>
                  <div className="text-xs text-gray-400 flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    {dateOf(story)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Spotlight */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-insightBlack">Leadership Spotlight</h2>
            <Link to="/leadership" className="text-sm font-semibold text-insightRed hover:text-insightBlack">View all</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadershipSpotlight.map((leader: any) => (
              <Card key={leader.id} className="group overflow-hidden border border-gray-200">
                <div className="h-56 bg-gray-100 flex items-center justify-center">
                  <img
                    src={leader.image_url || "/placeholder.svg"}
                    alt={leader.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <CardContent className="p-6 space-y-3">
                  <div className="text-xs uppercase tracking-wide text-insightRed font-semibold">Leadership</div>
                  <h3 className="text-xl font-semibold text-insightBlack group-hover:text-insightRed transition">
                    {leader.name}
                  </h3>
                  <p className="text-sm text-gray-600">{leader.title}</p>
                  {leader.company && <p className="text-xs text-gray-500">{leader.company}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-insightBlack">Press Releases</h2>
            <Link to="/press-releases" className="text-sm font-semibold text-insightRed hover:text-insightBlack">View all</Link>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-72 w-full">
                <div className="aspect-[3/4] rounded-2xl bg-white shadow-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={latestMagazine?.cover_image_url || "/placeholder.svg"}
                    alt={latestMagazine?.title || "Latest magazine"}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-4 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-insightBlack">
                  {latestMagazine?.title || "Our premium magazine experience"}
                </h3>
                <p className="text-gray-600">
                  {latestMagazine?.description || "Dive into strategic narratives, leadership dialogues, and architecture diagrams that show how bold ideas become disciplined execution."}
                </p>
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  {latestMagazine?.release_date ? `Published ${dateOf(latestMagazine)}` : "Digital + interactive formats"}
                </div>
                <Link to={latestMagazine ? `/magazine/${latestMagazine.slug}` : "/magazine"} className="inline-flex items-center text-insightRed font-semibold">
                  Open the latest issue
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-insightRed text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-3">Subscribe to {settings.companyName}</h3>
            <p className="text-white/90 mb-5">Monthly strategies and interviews for leaders. No noise, just signal.</p>
            <Link to="/magazine">
              <Button size="lg" className="bg-white text-insightRed hover:bg-gray-100">
                <BookOpen className="mr-2 h-5 w-5"/> Explore Issues
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Dark CTA */}
      <section className="py-20 bg-insightBlack text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Stay accountable to the future you are building</h2>
            <p className="text-white/80 text-lg">
              Subscribe to The CIO Vision and get the weekly Field Notes briefing—strategies tested by operators, distilled for leaders who demand momentum.
            </p>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <Users className="h-4 w-4" />
                </span>
                Stories that elevate people-first transformation.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <Layers className="h-4 w-4" />
                </span>
                Process maps and accountability scorecards you can deploy immediately.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <TrendingUp className="h-4 w-4" />
                </span>
                Growth signals sourced from the actions of past customers.
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/magazine">
                <Button size="lg" className="bg-insightRed text-white hover:bg-insightRed/90">
                  Subscribe now
                </Button>
              </Link>
              <Link to="/contact" className="inline-flex items-center text-white font-semibold">
                Partner with our newsroom
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-8 space-y-6">
            <h3 className="text-2xl font-semibold">Inside this week's Field Notes</h3>
            <div className="space-y-4 text-sm text-white/80">
              <div className="border-l-4 border-insightRed pl-4">
                <p className="font-semibold text-white">Culture as an engineering discipline</p>
                <p className="text-white/70 mt-1">
                  Three operating cadences high-growth teams use to turn values into measurable behaviors.
                </p>
              </div>
              <div className="border-l-4 border-insightRed pl-4">
                <p className="font-semibold text-white">Customer co-creation rituals</p>
                <p className="text-white/70 mt-1">
                  Workshops and retrospectives that convert feedback into product roadmaps your teams can rally behind.
                </p>
              </div>
              <div className="border-l-4 border-insightRed pl-4">
                <p className="font-semibold text-white">Accountability scorecard blueprint</p>
                <p className="text-white/70 mt-1">
                  A step-by-step template for tracking commitments across marketing, sales, and delivery squads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
