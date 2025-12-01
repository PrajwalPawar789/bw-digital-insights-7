import { useArticles, useFeaturedArticles } from "@/hooks/useArticles";
import { useMagazines } from "@/hooks/useMagazines";
import { useLeadershipProfiles } from "@/hooks/useLeadership";
import { usePressReleases } from "@/hooks/usePressReleases";
import { useSettings } from "@/hooks/useSettings";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ArrowRight, BookOpen, Newspaper, TrendingUp, Users, Building2, Globe, Award } from "lucide-react";
import { useMemo } from "react";

function imgOf(a: any) { return a?.image_url || a?.coverImage || a?.image || "/placeholder.svg"; }
function titleOf(a: any) { return a?.title || "Untitled"; }
function slugOf(a: any) { return a?.slug || ""; }
function dateOf(a: any) {
  const d = a?.date ? new Date(a.date) : null;
  return d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
}
function excerptOf(a: any) { return a?.excerpt || ""; }

const CategorySection = ({ title, articles, link }: { title: string, articles: any[], link: string }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
      <h3 className="text-lg font-bold text-insightBlack uppercase tracking-tight">{title}</h3>
      <Link to={link} className="text-xs font-semibold text-insightRed hover:text-insightBlack uppercase">View All</Link>
    </div>
    <div className="space-y-6">
      {articles.slice(0, 2).map((article, idx) => (
        <Link key={idx} to={`/article/${slugOf(article)}`} className="group block">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 aspect-[4/3] overflow-hidden rounded-md bg-gray-100">
              <img src={imgOf(article)} alt={titleOf(article)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="col-span-2 space-y-2">
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-insightRed line-clamp-2 leading-snug">
                {titleOf(article)}
              </h4>
              <p className="text-xs text-gray-500 line-clamp-2">{excerptOf(article)}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

const MagazineHeroTab = ({ title, description, magazines, link, mapImage }: { title: string, description: string, magazines: any[], link: string, mapImage: string }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12">
    <div className="lg:col-span-4 space-y-6 relative z-10">
      <h2 className="text-4xl md:text-5xl font-bold text-insightBlack font-premium tracking-tight uppercase">{title}</h2>
      <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
      <Link to={link}>
        <Button className="bg-insightRed hover:bg-insightBlack text-white rounded-full px-8">
          Read All Magazines
        </Button>
      </Link>
    </div>
    <div className="lg:col-span-8 relative">
      {/* Background Map */}
      <div className="absolute inset-0 opacity-10 pointer-events-none translate-x-20">
        <img src={mapImage} alt="Map" className="w-full h-full object-contain" />
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative z-10"
      >
        <CarouselContent className="-ml-4">
          {magazines.map((mag, idx) => (
            <CarouselItem key={idx} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Link to={`/magazine/${slugOf(mag)}`} className="group block relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl transition-transform duration-300 hover:-translate-y-2">
                <img src={imgOf(mag)} alt={titleOf(mag)} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end gap-2 mt-4">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  </div>
);

const Home = () => {
  const { data: rawArticles = [] } = useArticles();
  const { data: rawMagazines = [] } = useMagazines();
  const { data: featured = [] } = useFeaturedArticles();
  const { data: leadership = [] } = useLeadershipProfiles();
  const { data: press = [] } = usePressReleases();

  const articles = Array.isArray(rawArticles) ? rawArticles : [];
  const magazines = Array.isArray(rawMagazines) ? rawMagazines : [];

  // Categorize articles
  const categories = useMemo(() => {
    const cats: Record<string, any[]> = {
      Technology: [],
      Healthcare: [],
      Finance: [],
      Marketing: [],
      Education: [],
      Manufacturing: [],
      Consulting: [],
      Business: [],
      Others: [],
      "Case Study": [],
      "CXO Article": [],
      "Magazine Profile": [],
      "Cover Story": []
    };

    articles.forEach(a => {
      const c = a.category || "Others";
      // Simple mapping or direct assignment
      if (cats[c]) {
        cats[c].push(a);
      } else {
        // Fallback for unmapped categories
        cats["Others"].push(a);
      }
      
      // Also populate special sections if needed (mocking for now if data doesn't strictly match)
      if (a.title.toLowerCase().includes("case study")) cats["Case Study"].push(a);
      if (a.title.toLowerCase().includes("cxo")) cats["CXO Article"].push(a);
      if (a.title.toLowerCase().includes("profile")) cats["Magazine Profile"].push(a);
    });

    // Fill empty categories with some content for demo purposes if empty
    Object.keys(cats).forEach(k => {
      if (cats[k].length === 0) cats[k] = articles.slice(0, 4); // Fallback
    });

    return cats;
  }, [articles]);

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* HERO SECTION - TABS */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Tabs defaultValue="americas" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-gray-300 rounded-none h-auto p-0 mb-8 overflow-x-auto flex-nowrap">
              {["AMERICAS Editions", "EMEA Editions", "APAC Editions", "Hall of Fame"].map((tab) => {
                const val = tab.split(" ")[0].toLowerCase().replace(/ /g, "-");
                return (
                  <TabsTrigger 
                    key={val} 
                    value={val}
                    className="px-6 py-4 text-lg font-bold text-gray-500 data-[state=active]:text-insightRed data-[state=active]:border-b-4 data-[state=active]:border-insightRed data-[state=active]:bg-transparent rounded-none transition-all whitespace-nowrap"
                  >
                    {tab}
                  </TabsTrigger>
                )
              })}
            </TabsList>

            <TabsContent value="americas" className="focus:outline-none">
              <MagazineHeroTab 
                title="AMERICAS EDITIONS"
                description="As a region has developed rapidly with a Rising Economy. With a strong desire to start a business, American individuals have risen as the Unicorns ruling the Business World. The Enterprise World features the stories of these individuals in our special Americas edition."
                magazines={magazines.slice(0, 6)}
                link="/magazines"
                mapImage="/placeholder.svg" 
              />
            </TabsContent>
            <TabsContent value="emea" className="focus:outline-none">
              <MagazineHeroTab 
                title="EMEA EDITIONS"
                description="The EMEA region is the perfect market to grow your business in. With a Young, Educated Population and Plenty of opportunities for Growth, it has everything you need. Considered a place where businesses can thrive, EMEA is growing fast."
                magazines={magazines.slice(2, 8)}
                link="/magazines"
                mapImage="/placeholder.svg"
              />
            </TabsContent>
            <TabsContent value="apac" className="focus:outline-none">
              <MagazineHeroTab 
                title="APAC EDITIONS"
                description="Six out of the worlds 10 mega-cities are in East Asia. With a rapid growth rate, the APAC region has provided some of the Best Infrastructure, Workforce, and Huge opportunities for investment."
                magazines={magazines.slice(4, 10)}
                link="/magazines"
                mapImage="/placeholder.svg"
              />
            </TabsContent>
            <TabsContent value="hall-of-fame" className="focus:outline-none">
              <MagazineHeroTab 
                title="HALL OF FAME"
                description="Featuring The Enterprise Worlds most acclaimed and some of the best leaders and companies, the Hall of Fame is the annual celebration of leaders around the world."
                magazines={magazines.slice(0, 5)}
                link="/magazines"
                mapImage="/placeholder.svg"
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* THE ENTERPRISE DIARY & NEWSLETTER */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Categories Grid */}
            <div className="lg:col-span-9">
              <div className="flex items-center gap-3 mb-10">
                <div className="h-8 w-1 bg-insightRed rounded-full"></div>
                <h2 className="text-3xl font-bold text-insightBlack">The Enterprise Diary</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                <CategorySection title="Technology" articles={categories["Technology"]} link="/category/technology" />
                <CategorySection title="Healthcare" articles={categories["Healthcare"]} link="/category/healthcare" />
                <CategorySection title="Finance" articles={categories["Finance"]} link="/category/finance" />
                <CategorySection title="Marketing" articles={categories["Marketing"]} link="/category/marketing" />
                <CategorySection title="Education" articles={categories["Education"]} link="/category/education" />
                <CategorySection title="Manufacturing" articles={categories["Manufacturing"]} link="/category/manufacturing" />
                <CategorySection title="Consulting" articles={categories["Consulting"]} link="/category/consulting" />
                <CategorySection title="Business" articles={categories["Business"]} link="/category/business" />
                <CategorySection title="Others" articles={categories["Others"]} link="/category/others" />
              </div>
            </div>

            {/* Right Column: Newsletter Sticky */}
            <div className="lg:col-span-3">
              <div className="sticky top-24 space-y-8">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-insightRed">
                    <Newspaper className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-insightBlack mb-2">Join The<br/>Newsletter</h3>
                  <p className="text-gray-500 text-sm mb-6">Subscribe to our newsletter now and stay informed!</p>
                  
                  <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                    <Input placeholder="Email Address" className="bg-white border-gray-200" />
                    <Button className="w-full bg-insightRed hover:bg-insightBlack text-white">
                      Subscribe
                    </Button>
                  </form>
                </div>

                {/* Ad Placeholder */}
                <div className="aspect-[3/4] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 border border-dashed border-gray-300">
                  <span>Ad Space</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* COVER STORY SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 bg-insightRed rounded-full"></div>
              <h2 className="text-3xl font-bold text-insightBlack">Cover Story</h2>
            </div>
            <Link to="/cover-story" className="text-insightRed font-semibold hover:text-insightBlack flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {(categories["Cover Story"].length ? categories["Cover Story"] : featured).map((article, idx) => (
                <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                  <Link to={`/article/${slugOf(article)}`} className="group block h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="aspect-video overflow-hidden">
                      <img src={imgOf(article)} alt={titleOf(article)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-6">
                      <Badge variant="secondary" className="mb-3 bg-red-50 text-insightRed hover:bg-red-100">Cover Story</Badge>
                      <h3 className="text-xl font-bold text-insightBlack mb-3 group-hover:text-insightRed transition-colors line-clamp-2">
                        {titleOf(article)}
                      </h3>
                      <p className="text-gray-500 line-clamp-3 text-sm leading-relaxed">
                        {excerptOf(article)}
                      </p>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end gap-2 mt-6">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* CXO ARTICLES & CASE STUDIES */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* CXO Articles */}
            <div>
              <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-insightBlack flex items-center gap-2">
                  <Users className="w-6 h-6 text-insightRed" /> CXO Articles
                </h2>
                <Link to="/cxo-articles" className="text-sm font-semibold text-gray-500 hover:text-insightRed">View All</Link>
              </div>
              <div className="space-y-8">
                {(categories["CXO Article"].length ? categories["CXO Article"] : articles.slice(5, 8)).map((article, idx) => (
                  <Link key={idx} to={`/article/${slugOf(article)}`} className="flex gap-6 group items-start">
                    <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img src={imgOf(article)} alt={titleOf(article)} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-insightBlack group-hover:text-insightRed leading-tight mb-2">
                        {titleOf(article)}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{excerptOf(article)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Case Studies */}
            <div>
              <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-insightBlack flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-insightRed" /> Case Studies
                </h2>
                <Link to="/case-studies" className="text-sm font-semibold text-gray-500 hover:text-insightRed">View All</Link>
              </div>
              <div className="space-y-8">
                {(categories["Case Study"].length ? categories["Case Study"] : articles.slice(8, 11)).map((article, idx) => (
                  <Link key={idx} to={`/article/${slugOf(article)}`} className="flex gap-6 group items-start">
                    <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img src={imgOf(article)} alt={titleOf(article)} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-insightBlack group-hover:text-insightRed leading-tight mb-2">
                        {titleOf(article)}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{excerptOf(article)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAGAZINE PROFILES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-8 w-1 bg-insightRed rounded-full"></div>
            <h2 className="text-3xl font-bold text-insightBlack">Magazine Profiles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(categories["Magazine Profile"].length ? categories["Magazine Profile"] : leadership.slice(0, 4)).map((profile: any, idx: number) => (
              <Link key={idx} to={`/leadership/${slugOf(profile)}`} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-full sm:w-48 aspect-[3/4] flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                  <img src={profile.image_url || profile.image || "/placeholder.svg"} alt={profile.name || titleOf(profile)} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-insightBlack mb-3 group-hover:text-insightRed">
                    {profile.name || titleOf(profile)}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {profile.bio || excerptOf(profile)}
                  </p>
                  <span className="inline-flex items-center text-insightRed font-semibold text-sm">
                    Read Profile <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
