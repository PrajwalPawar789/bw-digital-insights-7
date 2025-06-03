import React from 'react';
import { Link } from 'react-router-dom';
import { useFeaturedNews } from '@/hooks/useIndustryNews';

const Home = () => {
  const { data: featuredNews = [] } = useFeaturedNews();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-insightBlack to-gray-900 text-white py-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40">
          <img
            src="https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Abstract background"
            className="absolute w-full h-full object-cover transform scale-125"
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Unlock Deeper Insights with BW Digital
            </h1>
            <p className="text-lg mb-8">
              Explore expert analysis, industry trends, and strategic foresight to
              drive your business forward.
            </p>
            <Link
              to="/articles"
              className="inline-block bg-insightRed hover:bg-insightBlack text-white px-8 py-3 rounded-md font-medium transition-colors"
            >
              Explore Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-insightBlack mb-4">Featured Insights</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the latest trends and analysis shaping the future of business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-insightRed transition-colors">
                  AI and Machine Learning Transforming Business Operations
                </h3>
                <p className="text-gray-600 mb-4">
                  How artificial intelligence is revolutionizing decision-making and operational efficiency across industries.
                </p>
                <Link
                  to="/article/ai-machine-learning-transforming-business-operations"
                  className="text-insightRed hover:text-insightBlack font-medium inline-flex items-center"
                >
                  Read Full Article
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-48 bg-gradient-to-br from-green-500 to-green-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-insightRed transition-colors">
                  Digital Transformation in Financial Services
                </h3>
                <p className="text-gray-600 mb-4">
                  How banks and financial institutions are leveraging technology to enhance customer experience.
                </p>
                <Link
                  to="/article/digital-transformation-in-financial-services"
                  className="text-insightRed hover:text-insightBlack font-medium inline-flex items-center"
                >
                  Read Full Article
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-insightRed transition-colors">
                  ESG Initiatives Driving Long-term Business Value
                </h3>
                <p className="text-gray-600 mb-4">
                  How environmental, social, and governance programs create sustainable competitive advantages.
                </p>
                <Link
                  to="/article/esg-initiatives-driving-long-term-business-value"
                  className="text-insightRed hover:text-insightBlack font-medium inline-flex items-center"
                >
                  Read Full Article
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/articles"
              className="inline-block bg-white hover:bg-gray-100 text-insightBlack px-6 py-3 rounded-md font-medium transition-colors border border-gray-300"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Industry News Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-insightBlack mb-4">Industry News</h2>
              <p className="text-gray-600">Stay updated with the latest developments across key business sectors</p>
            </div>
            <Link
              to="/industry-news"
              className="bg-insightRed hover:bg-insightBlack text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center"
            >
              View All News
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredNews.slice(0, 3).map((news) => (
              <div key={news.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
                <div className="relative">
                  <img
                    src={news.image_url}
                    alt={news.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {news.industry}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-insightRed transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {news.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{news.source}</span>
                    <span>{news.date}</span>
                  </div>
                  <Link
                    to={`/article/${news.slug}`}
                    className="text-insightRed hover:text-insightBlack font-medium inline-flex items-center"
                  >
                    Read Full Analysis
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-insightBlack text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-extrabold mb-2">150+</div>
              <p className="text-lg">Articles Published</p>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">10,000+</div>
              <p className="text-lg">Monthly Readers</p>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">50+</div>
              <p className="text-lg">Industry Experts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-insightBlack mb-8 text-center">
            What Our Readers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 italic mb-4">
                "BW Digital provides invaluable insights that help me stay ahead in
                a rapidly evolving industry. The analysis is always sharp and
                actionable."
              </p>
              <p className="text-gray-600 font-medium">- John Smith, CEO</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 italic mb-4">
                "I rely on BW Digital for the latest trends and strategic
                foresight. It's an essential resource for any business leader."
              </p>
              <p className="text-gray-600 font-medium">
                - Emily Johnson, Marketing Director
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-r from-insightBlack to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Ready to Dive Deeper?
          </h2>
          <p className="text-lg mb-12">
            Subscribe to our newsletter for exclusive content, early access to
            reports, and more.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-insightRed hover:bg-insightBlack text-white px-8 py-3 rounded-md font-medium transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
