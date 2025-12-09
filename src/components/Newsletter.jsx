import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Store in localStorage for now
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
    }

    setIsSubscribed(true);
    toast({
      title: "Successfully Subscribed! 🎉",
      description: "Welcome to The Daily Knowledge community. Check your inbox soon!",
    });

    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#A8B8A8]/20 via-[#F5F1E8] to-[#C97C5C]/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-8 md:p-12 lg:p-16">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#C97C5C] to-[#A8B8A8] rounded-full mb-6"
              >
                <Mail className="w-8 h-8 text-white" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4">
                Never Miss an <span className="text-[#C97C5C]">Insight</span>
              </h2>
              <p className="text-lg text-[#2C2C2C]/70 max-w-xl mx-auto">
                Subscribe to our newsletter and get the latest articles, tips, and inspiration delivered straight to your inbox every week.
              </p>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 bg-[#F5F1E8] border-2 border-[#A8B8A8]/20 rounded-xl text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:border-[#C97C5C] transition-all duration-300"
                    disabled={isSubscribed}
                  />
                  {isSubscribed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#A8B8A8]" />
                    </motion.div>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubscribed}
                  className="bg-gradient-to-r from-[#C97C5C] to-[#A8B8A8] hover:from-[#B86B4C] hover:to-[#98A898] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubscribed ? (
                    'Subscribed!'
                  ) : (
                    <>
                      Subscribe
                      <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </Button>
              </div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-[#2C2C2C]/60">
                Join 10,000+ readers who trust us for daily insights. Unsubscribe anytime.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[#2C2C2C]/60"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#A8B8A8] rounded-full"></div>
                <span>Weekly Digest</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#C97C5C] rounded-full"></div>
                <span>Exclusive Content</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#A8B8A8] rounded-full"></div>
                <span>No Spam</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;