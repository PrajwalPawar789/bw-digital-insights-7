
import { Building } from 'lucide-react';

const ClientLogos = () => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center px-3 py-1 bg-insightRed/10 text-insightRed rounded-full text-sm font-medium mb-4">
            <Building className="w-4 h-4 mr-2" /> Trusted By Leaders
          </div>
          <h2 className="text-4xl font-bold text-insightBlack mb-4">Our Prestigious Clients</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Global enterprises that trust InsightsBW for their executive marketing needs
          </p>
        </div>
        
        {/* Desktop view - Grid layout in 5 columns */}
        <div className="hidden md:block">
          <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 justify-center items-center gap-12">
              {/* Client logos */}
              <ClientLogo imageUrl="https://insightscare.in/wp-content/uploads/2025/03/12.png" />
              <ClientLogo imageUrl="https://insightscare.in/wp-content/uploads/2025/03/13.png" />
              <ClientLogo imageUrl="https://insightscare.in/wp-content/uploads/2025/03/14.png" />
              <ClientLogo imageUrl="https://insightscare.in/wp-content/uploads/2025/03/2-1.png" />
              <ClientLogo imageUrl="https://insightscare.in/wp-content/uploads/2025/03/1-1.png" />
              <ClientLogo imageUrl="https://insightscare.in/wp-content/uploads/2025/03/15.png" />
              <ClientLogo imageUrl="https://insightscare.in/wp-content/uploads/2025/03/16.png" />
              <ClientLogo imageUrl="https://insightscare.in/wp-content/uploads/2025/03/4.png" />
              <ClientLogo imageUrl="https://insightscare.in/wp-content/uploads/2025/03/5.png" />
              <ClientLogo imageUrl="https://insightscare.in/wp-content/uploads/2025/03/6.png" />
            </div>
          </div>
        </div>
        
        {/* Mobile view - Clean slow scrolling marquee */}
        <div className="md:hidden">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
            <div className="p-6 overflow-hidden">
              <div className="flex gap-8 animate-scroll hover:pause">
                <ClientLogo imageUrl="https://insightscare.in/wp-content/uploads/2025/03/12.png" isMobile />
                <ClientLogo imageUrl="https://insightscare.in/wp-content/uploads/2025/03/13.png" isMobile />
                <ClientLogo imageUrl="https://insightscare.in/wp-content/uploads/2025/03/14.png" isMobile />
                <ClientLogo imageUrl="https://insightscare.in/wp-content/uploads/2025/03/2-1.png" isMobile />
                <ClientLogo imageUrl="https://insightscare.in/wp-content/uploads/2025/03/1-1.png" isMobile />
                <ClientLogo imageUrl="https://insightscare.in/wp-content/uploads/2025/03/15.png" isMobile />
                <ClientLogo imageUrl="https://insightscare.in/wp-content/uploads/2025/03/16.png" isMobile />
                <ClientLogo imageUrl="https://insightscare.in/wp-content/uploads/2025/03/4.png" isMobile />
                <ClientLogo imageUrl="https://insightscare.in/wp-content/uploads/2025/03/5.png" isMobile />
              </div>
            </div>
          </div>
        </div>
        
        {/* Trust indicator */}
        <div className="flex justify-center mt-8">
          <div className="inline-flex items-center text-sm text-gray-500">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-insightRed"></span>
            Trusted by over 250+ global companies
          </div>
        </div>
        
        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .animate-scroll {
            min-width: 200%;
            display: flex;
            animation: scroll 30s linear infinite;
          }
          .hover\:pause:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
};

// Enhanced client logo component for professional styling
const ClientLogo = ({ imageUrl, isMobile = false }) => {
  return (
    <div className={`flex justify-center items-center ${isMobile ? 'w-28' : 'w-full'}`}>
      <div className="p-4 hover:shadow-lg transition-all duration-300 rounded-md border border-gray-100 bg-white w-full h-full flex items-center justify-center group">
        <img 
          src={imageUrl} 
          alt="Client logo"
          className="max-h-10 max-w-full object-contain filter transition-all duration-300 group-hover:scale-110 group-hover:grayscale-0"
        />
      </div>
    </div>
  );
};

export default ClientLogos;
