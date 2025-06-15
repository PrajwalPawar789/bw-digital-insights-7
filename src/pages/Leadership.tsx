
import React from 'react';
import { useLeadershipProfiles } from '@/hooks/useLeadership';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Users, Award, Building2, ArrowRight } from 'lucide-react';

const Leadership = () => {
  const { data: leaders, isLoading } = useLeadershipProfiles();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-insightRed"></div>
      </div>
    );
  }

  const featuredLeaders = Array.isArray(leaders) ? leaders.filter((leader) => leader.featured) : [];
  const regularLeaders = Array.isArray(leaders) ? leaders.filter((leader) => !leader.featured) : [];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* HERO */}
      <section className="relative w-full h-[340px] sm:h-[420px] md:h-[480px] flex items-stretch mb-10">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(26,26,26,0.78) 55%,rgba(230,57,70,0.04)), url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="relative z-10 flex flex-1 items-center max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="max-w-2xl text-left">
            <div className="flex items-center mb-5">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 shadow-md mr-4">
                <Users className="h-7 w-7 text-white" />
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">Leadership Directory</h1>
            </div>
            <p className="text-lg text-gray-200 leading-relaxed mb-2 max-w-xl drop-shadow">
              Get to know the leaders pioneering the future of business and technology. 
            </p>
            <p className="text-base text-white/70 max-w-lg">
              Discover visionaries, innovators, and executives making a difference worldwide.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* FEATURED */}
        {featuredLeaders.length > 0 && (
          <section className="mb-18">
            <div className="flex items-center gap-3 mb-8">
              <Award className="h-6 w-6 text-insightRed" />
              <h2 className="text-2xl font-bold text-insightBlack tracking-tight">Featured Leaders</h2>
            </div>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {featuredLeaders.map((leader, idx) => (
                <div
                  key={leader.id}
                  className={`
                    bg-white rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 flex flex-col hover-lift
                    ${idx === 0 ? "md:col-span-2 md:flex-row md:h-[340px]" : "h-full"}
                  `}
                  style={idx === 0 ? { minHeight: 340 } : {}}
                >
                  <div className={idx === 0 ? "md:w-1/2" : ""}>
                    <div className={idx === 0 ? "h-[240px] md:h-full rounded-t-2xl md:rounded-tl-2xl md:rounded-bl-2xl overflow-hidden" : "aspect-[4/3] rounded-t-2xl overflow-hidden"}>
                      <img
                        src={leader.image_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800'}
                        alt={leader.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className={`${idx === 0 ? "flex-1 md:p-8 p-6" : "p-6"} flex flex-col`}>
                    <span className="self-start mb-2 px-2 py-1 text-xs bg-insightRed/10 text-insightRed rounded font-semibold tracking-wide">
                      Featured
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-insightBlack mb-2">
                      {leader.name}
                    </h3>
                    <p className="text-insightRed font-semibold">{leader.title}</p>
                    {leader.company && (
                      <div className="flex items-center text-gray-600 mt-1 mb-2">
                        <Building2 className="h-4 w-4 mr-2" />
                        <span className="text-sm">{leader.company}</span>
                      </div>
                    )}
                    <p className={`text-gray-600 my-2 mb-4 text-sm line-clamp-3`}>
                      {leader.bio}
                    </p>
                    <div className="flex items-end justify-between mt-auto">
                      <div className="flex space-x-2">
                        {leader.linkedin_url && (
                          <a
                            href={leader.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                        )}
                        {leader.twitter_url && (
                          <a
                            href={leader.twitter_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-400 transition-colors"
                          >
                            <Twitter className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                      <Link
                        to={`/leadership/${leader.slug}`}
                        className="inline-flex items-center text-insightRed hover:text-insightBlack font-medium transition-colors text-sm"
                      >
                        View Profile <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* REGULAR LEADERS */}
        {regularLeaders.length > 0 && (
          <section className="mb-20">
            <h2 className="text-xl font-semibold text-insightBlack mt-10 mb-8">All Leadership Profiles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {regularLeaders.map((leader) => (
                <Link
                  to={`/leadership/${leader.slug}`}
                  key={leader.id}
                  className="group bg-white rounded-2xl border shadow-md hover:shadow-lg transition-all hover:border-insightRed hover-lift flex flex-col"
                >
                  <div className="aspect-[4/3] rounded-t-2xl overflow-hidden">
                    <img
                      src={leader.image_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'}
                      alt={leader.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-insightBlack mb-1 group-hover:text-insightRed transition-colors">
                        {leader.name}
                      </h3>
                      <p className="text-insightRed text-sm mb-1 font-semibold">{leader.title}</p>
                      {leader.company && (
                        <div className="flex items-center text-gray-500 mb-2">
                          <Building2 className="h-4 w-4 mr-2" />
                          <span className="text-xs">{leader.company}</span>
                        </div>
                      )}
                      <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                        {leader.bio}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-2">
                        {leader.linkedin_url && (
                          <a
                            href={leader.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-blue-600 transition-colors"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                        {leader.twitter_url && (
                          <a
                            href={leader.twitter_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-blue-400 transition-colors"
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                      <span className="inline-flex font-medium text-insightRed group-hover:text-insightBlack transition-colors text-xs items-center">
                        View
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* EMPTY STATE */}
        {(Array.isArray(leaders) && leaders.length === 0) && (
          <div className="text-center py-20">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-5" />
            <h3 className="text-xl font-semibold text-insightBlack mb-2">No Leadership Profiles Found</h3>
            <p className="text-gray-500 max-w-sm mx-auto">Check back soon for inspiring stories and executive leadership profiles.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Leadership;

