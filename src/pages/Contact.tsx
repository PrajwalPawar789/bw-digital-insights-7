
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Building, Users } from 'lucide-react';
import { toast } from "sonner";
import { useSettings } from '@/hooks/useSettings';

const Contact = () => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Our Office",
      details: ["123 Business District", "New York, NY 10001", "United States"]
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543", "Mon-Fri 9AM-6PM EST"]
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: [`contact@${settings.companyName.toLowerCase().replace(/\s+/g, '')}.com`, `support@${settings.companyName.toLowerCase().replace(/\s+/g, '')}.com`, "We respond within 24 hours"]
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM", "Sunday: Closed"]
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-insightRed to-red-700 rounded-2xl mb-6 shadow-lg">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-insightBlack mb-4">
            Get in Touch with {settings.companyName}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our services? Want to explore partnership opportunities? 
            We'd love to hear from you and discuss how we can help drive your business forward.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-insightBlack flex items-center">
                  <Send className="mr-3 h-6 w-6 text-insightRed" />
                  Send us a Message
                </CardTitle>
                <CardDescription className="text-lg">
                  Fill out the form below and our team will get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="h-12"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="h-12"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                        Company/Organization
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="h-12"
                        placeholder="Enter your company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="h-12"
                        placeholder="What is this regarding?"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-insightRed hover:bg-red-700 text-white font-semibold text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-insightRed to-red-700 rounded-lg flex items-center justify-center text-white">
                        {info.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-insightBlack mb-2">
                        {info.title}
                      </h3>
                      <div className="space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Additional Info Card */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-insightBlack to-gray-900 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Building className="mr-2 h-6 w-6" />
                  Why Choose {settings.companyName}?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-red-400" />
                    <span>Expert team with 10+ years experience</span>
                  </li>
                  <li className="flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4 text-red-400" />
                    <span>24/7 customer support</span>
                  </li>
                  <li className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-red-400" />
                    <span>Quick response time</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
