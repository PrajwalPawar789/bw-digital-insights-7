
import { useState, useEffect } from 'react';
import { Building } from 'lucide-react';

// Client logos data
const clientLogos = [
  "https://insightscare.in/wp-content/uploads/2025/03/12.png",
  "https://insightscare.in/wp-content/uploads/2025/03/13.png",
  "https://insightscare.in/wp-content/uploads/2025/03/14.png",
  "https://insightscare.in/wp-content/uploads/2025/03/2-1.png",
  "https://insightscare.in/wp-content/uploads/2025/03/1-1.png",
  "https://insightscare.in/wp-content/uploads/2025/03/15.png",
  "https://insightscare.in/wp-content/uploads/2025/03/16.png",
  "https://insightscare.in/wp-content/uploads/2025/03/4.png",
  "https://insightscare.in/wp-content/uploads/2025/03/5.png",
  "https://insightscare.in/wp-content/uploads/2025/03/6.png",
  "https://insightscare.in/wp-content/uploads/2025/03/7.png",
  "https://insightscare.in/wp-content/uploads/2025/03/8.png",
  "https://insightscare.in/wp-content/uploads/2025/03/9.png",
  "https://insightscare.in/wp-content/uploads/2025/03/10.png",
  "https://insightscare.in/wp-content/uploads/2025/03/11.png"
];

const ClientLogos = () => {
  const [isHovering, setIsHovering] = useState(false);

  // Split logos into groups for better display
  const logoGroups = [];
  for (let i = 0; i < clientLogos.length; i += 5) {
    logoGroups.push(clientLogos.slice(i, i + 5));
  }

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 bg-insightRed/10 text-insightRed rounded-full text-sm font-medium mb-4">
            <Building className="w-4 h-4 mr-2" /> Trusted By Leaders
          </div>
          <h2 className="text-4xl font-bold text-insightBlack mb-4">Our Prestigious Clients</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Global enterprises that trust InsightsBW for their executive marketing needs
          </p>
        </div>
        
        {/* Client logos display */}
        <div className="bg-white p-6 rounded-lg shadow-lg"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Desktop view - Grid layout */}
          <div className="hidden md:grid grid-cols-5 gap-8">
            {clientLogos.slice(0, 10).map((logo, index) => (
              <ClientLogo key={index} logo={logo} index={index} />
            ))}
          </div>

          {/* Mobile view - Slow marquee */}
          <div className="md:hidden overflow-hidden">
            <div 
              className={`flex gap-6 ${isHovering ? '' : 'animate-slow-scroll'}`}
              style={{
                animationPlayState: isHovering ? 'paused' : 'running',
                minWidth: 'max-content'
              }}
            >
              {clientLogos.map((logo, index) => (
                <ClientLogo key={index} logo={logo} index={index} mobileView />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Extracted client logo component
const ClientLogo = ({ logo, index, mobileView = false }) => {
  return (
    <div className={`group flex flex-col items-center ${mobileView ? 'min-w-[120px]' : ''}`}>
      <div className="h-20 w-full flex items-center justify-center mb-3 bg-white border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-300">
        <img 
          src={logo} 
          alt={`Client ${index + 1}`}
          className="h-full w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity" 
        />
      </div>
      <div className="relative">
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-insightRed group-hover:w-full group-hover:left-0 group-hover:transform-none transition-all duration-500 ease-out"></div>
      </div>
    </div>
  );
};

export default ClientLogos;
