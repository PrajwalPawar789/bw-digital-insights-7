
import { teamData } from '../data/teamData';

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission and Vision Section */}
        <section className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-insightBlack mb-6 text-center">About InsightsBW</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-insightRed mb-4">Our Mission</h2>
              <p className="text-gray-600">
                At InsightsBW, we are dedicated to providing cutting-edge insights and thought leadership 
                in the technology and business landscape. Our mission is to empower leaders with actionable 
                intelligence, innovative perspectives, and in-depth analysis that drives strategic decision-making.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-insightRed mb-4">Our Vision</h2>
              <p className="text-gray-600">
                We envision a world where business leaders are equipped with transformative knowledge that 
                enables them to navigate complexity, foster innovation, and create sustainable growth. 
                Through our comprehensive research, interviews, and expert insights, we aim to be the 
                premier platform for forward-thinking leaders.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-2xl font-bold text-insightBlack mb-8 text-center">Our Leadership Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamData.map(member => (
              <div 
                key={member.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-insightBlack mb-1">{member.name}</h3>
                  <p className="text-insightRed font-medium mb-2">{member.title}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
