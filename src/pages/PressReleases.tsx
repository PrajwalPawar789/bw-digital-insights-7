
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, ArrowRight, Megaphone } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Mock data - replace with actual data fetching
const pressReleases = [
  {
    id: "1",
    title: "Company Announces Strategic Partnership with Global Tech Leader",
    excerpt: "This partnership will accelerate our digital transformation initiatives and expand our market reach across new territories.",
    date: "2024-01-15",
    category: "Partnership",
    slug: "strategic-partnership-announcement",
    urgent: true
  },
  {
    id: "2", 
    title: "Q4 Financial Results Exceed Expectations",
    excerpt: "Record-breaking quarter demonstrates the strength of our strategic initiatives and market positioning.",
    date: "2024-01-10",
    category: "Financial",
    slug: "q4-financial-results",
    urgent: false
  },
  {
    id: "3",
    title: "New Sustainability Initiative Launched",
    excerpt: "Comprehensive program aims to achieve carbon neutrality by 2030 through innovative technology solutions.",
    date: "2024-01-05",
    category: "Sustainability",
    slug: "sustainability-initiative-launch",
    urgent: false
  }
];

const PressReleases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Partnership", "Financial", "Sustainability", "Product", "Leadership"];

  const filteredReleases = pressReleases.filter(release => {
    const matchesSearch = release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         release.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || release.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <section className="relative bg-gradient-to-br from-insightBlack via-gray-900 to-insightBlack text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Megaphone className="h-12 w-12 text-insightRed mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold">
                Press <span className="text-insightRed">Releases</span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Stay informed with the latest company announcements, partnerships, and strategic initiatives from our leadership team.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search press releases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-insightRed hover:bg-red-700" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Press Releases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReleases.map((release) => (
              <Card key={release.id} className="overflow-hidden hover:shadow-xl transition-shadow group border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={release.urgent ? "destructive" : "secondary"} className={release.urgent ? "bg-insightRed" : ""}>
                      {release.category}
                    </Badge>
                    {release.urgent && (
                      <Badge variant="outline" className="border-red-500 text-red-500">
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl group-hover:text-insightRed transition-colors line-clamp-2">
                    <Link to={`/press-releases/${release.slug}`}>
                      {release.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-gray-600 line-clamp-3">
                    {release.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDistanceToNow(new Date(release.date), { addSuffix: true })}</span>
                    </div>
                  </div>
                  <Link
                    to={`/press-releases/${release.slug}`}
                    className="text-insightRed hover:text-insightBlack font-semibold text-sm flex items-center"
                  >
                    Read Full Release
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredReleases.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No press releases found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PressReleases;
