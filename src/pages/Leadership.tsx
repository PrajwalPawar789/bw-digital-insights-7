import React from 'react';
import { useLeadershipProfiles } from '@/hooks/useLeadership';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, ArrowRight, Users, Award, Building2 } from 'lucide-react';

const Leadership = () => {
  const { data: leaders, isLoading } = useLeadershipProfiles();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-insightRed"></div>
      </div>
    );
  }

  // Filter and organize leaders
  const featuredLeaders = leaders?.filter(leader => leader.featured) || [];
  const regularLeaders = leaders?.filter(leader => !leader.featured) || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with black background */}
      <div className="relative bg-gradient-to-r from-gray-900 to-insightBlack text-white py-20">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Elite Business Leadership Network</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-insightRed mb-4">Visionary Leaders</h2>
            <h3 className="text-xl md:text-2xl mb-6">Shaping Tomorrow</h3>
            <p className="max-w-4xl mx-auto text-lg text-gray-200 mb-8">
              Meet the extraordinary executives, innovators, and thought leaders who are redefining industries, 
              driving global transformation, and creating the future of business. Their strategic insights and 
              proven leadership excellence inspire the next generation of industry titans.
            </p>
            
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-insightRed mb-2">500+</div>
                <div className="text-sm md:text-base text-gray-300">Global Executives</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-insightRed mb-2">50+</div>
                <div className="text-sm md:text-base text-gray-300">Countries Represented</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-insightRed mb-2">$2T+</div>
                <div className="text-sm md:text-base text-gray-300">Combined Revenue Led</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-insightRed mb-2">95%</div>
                <div className="text-sm md:text-base text-gray-300">Fortune 500 Reach</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Leaders Section */}
          {featuredLeaders.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <Award className="h-6 w-6 text-insightRed mr-3" />
                <h2 className="text-2xl font-bold text-insightBlack">Featured Leaders</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* First featured leader - larger card */}
                {featuredLeaders[0] && (
                  <div className="lg:col-span-2 lg:row-span-2">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full border border-gray-100">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={featuredLeaders[0].image_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800'}
                          alt={featuredLeaders[0].name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-8">
                        <div className="flex items-center mb-4">
                          <span className="bg-insightRed text-white px-3 py-1 rounded-full text-sm font-medium">
                            Featured Leader
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-insightBlack mb-2">
                          {featuredLeaders[0].name}
                        </h3>
                        <p className="text-insightRed font-semibold mb-2">
                          {featuredLeaders[0].title}
                        </p>
                        {featuredLeaders[0].company && (
                          <div className="flex items-center text-gray-600 mb-4">
                            <Building2 className="h-4 w-4 mr-2" />
                            <span>{featuredLeaders[0].company}</span>
                          </div>
                        )}
                        <p className="text-gray-600 mb-6 line-clamp-4">
                          {featuredLeaders[0].bio}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-3">
                            {featuredLeaders[0].linkedin_url && (
                              <a
                                href={featuredLeaders[0].linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-600 transition-colors"
                              >
                                <Linkedin className="h-5 w-5" />
                              </a>
                            )}
                            {featuredLeaders[0].twitter_url && (
                              <a
                                href={featuredLeaders[0].twitter_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-400 transition-colors"
                              >
                                <Twitter className="h-5 w-5" />
                              </a>
                            )}
                          </div>
                          <Link
                            to={`/leadership/${featuredLeaders[0].slug}`}
                            className="inline-flex items-center text-insightRed hover:text-insightBlack font-medium transition-colors"
                          >
                            Read Profile <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Other featured leaders - smaller cards */}
                <div className="lg:col-span-1 space-y-8">
                  {featuredLeaders.slice(1, 3).map((leader) => (
                    <div key={leader.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={leader.image_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'}
                          alt={leader.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <span className="bg-insightRed text-white px-2 py-1 rounded-full text-xs font-medium mb-3 inline-block">
                          Featured
                        </span>
                        <h3 className="text-xl font-bold text-insightBlack mb-2">
                          {leader.name}
                        </h3>
                        <p className="text-insightRed font-semibold mb-2">
                          {leader.title}
                        </p>
                        {leader.company && (
                          <div className="flex items-center text-gray-600 mb-3">
                            <Building2 className="h-4 w-4 mr-2" />
                            <span className="text-sm">{leader.company}</span>
                          </div>
                        )}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {leader.bio}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {leader.linkedin_url && (
                              <a
                                href={leader.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-600 transition-colors"
                              >
                                <Linkedin className="h-4 w-4" />
                              </a>
                            )}
                            {leader.twitter_url && (
                              <a
                                href={leader.twitter_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-400 transition-colors"
                              >
                                <Twitter className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                          <Link
                            to={`/leadership/${leader.slug}`}
                            className="text-insightRed hover:text-insightBlack font-medium text-sm transition-colors"
                          >
                            View Profile
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* All Leaders Section */}
          {regularLeaders.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-insightBlack mb-8">All Leadership Profiles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularLeaders.map((leader) => (
                  <div key={leader.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={leader.image_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'}
                        alt={leader.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-insightBlack mb-2">
                        {leader.name}
                      </h3>
                      <p className="text-insightRed font-semibold mb-2">
                        {leader.title}
                      </p>
                      {leader.company && (
                        <div className="flex items-center text-gray-600 mb-3">
                          <Building2 className="h-4 w-4 mr-2" />
                          <span className="text-sm">{leader.company}</span>
                        </div>
                      )}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {leader.bio}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {leader.linkedin_url && (
                            <a
                              href={leader.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          )}
                          {leader.twitter_url && (
                            <a
                              href={leader.twitter_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-blue-400 transition-colors"
                            >
                              <Twitter className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                        <Link
                          to={`/leadership/${leader.slug}`}
                          className="text-insightRed hover:text-insightBlack font-medium text-sm transition-colors"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {(!leaders || leaders.length === 0) && (
            <div className="text-center py-16">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Leadership Profiles Available</h3>
              <p className="text-gray-500">Check back soon for inspiring leadership stories and profiles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leadership;
