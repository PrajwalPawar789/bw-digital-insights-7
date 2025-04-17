
import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulated form submission
    toast.success('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-insightBlack mb-6">Contact Us</h1>
            <p className="text-gray-600 mb-8">
              Have a question or want to collaborate? Fill out the form below, and our team will get back to you.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone (Optional)
                </label>
                <Input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890" 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..." 
                  required 
                  rows={5} 
                />
              </div>
              
              <Button type="submit" className="w-full bg-insightRed hover:bg-insightBlack transition-colors">
                Send Message
              </Button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-insightBlack mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="mr-4 text-insightRed h-6 w-6" />
                <div>
                  <h3 className="font-semibold text-insightBlack">Email</h3>
                  <p className="text-gray-600">info@insightsbw.com</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="mr-4 text-insightRed h-6 w-6" />
                <div>
                  <h3 className="font-semibold text-insightBlack">Phone</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="mr-4 text-insightRed h-6 w-6" />
                <div>
                  <h3 className="font-semibold text-insightBlack">Address</h3>
                  <p className="text-gray-600">123 Innovation Drive, Tech City, ST 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
