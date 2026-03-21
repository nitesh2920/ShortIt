import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Zap, Shield, BarChart3, ChevronRight } from "lucide-react";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="text-center pt-8 pb-20 sm:pt-12 sm:pb-32 space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium glass border-primary/20 text-primary mb-4">
          <Zap className="h-4 w-4 mr-2 fill-primary" />
          <span>New: Advanced analytics for every link</span>
        </div>
        
        <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]">
          Shorten <span className="text-gradient">Smarter</span>.<br />
          Share <span className="text-gradient">Faster</span>.
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The ultimate link management platform. Create short, branded links and get deep insights into your audience with our real-time analytics.
        </p>

        <form
          onSubmit={handleShorten}
          className="flex flex-col sm:flex-row w-full max-w-2xl mx-auto gap-3 p-2 glass rounded-2xl shadow-2xl transition-all hover:shadow-primary/5"
        >
          <Input
            type="url"
            placeholder="Paste your long link here..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-lg py-6 px-4"
          />
          <Button 
            type="submit" 
            size="lg"
            className="premium-gradient text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-primary/30 transition-all active:scale-95 text-lg font-semibold" 
          >
            Shorten Now
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </section>

      {/* Features Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-32">
        <div className="glass p-8 rounded-3xl space-y-4 hover:border-primary/30 transition-colors">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Secure Links</h3>
          <p className="text-muted-foreground leading-relaxed">Your data is safe with us. We use advanced encryption and protect your links from spam.</p>
        </div>
        <div className="glass p-8 rounded-3xl space-y-4 hover:border-primary/30 transition-colors">
          <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-orange-500" />
          </div>
          <h3 className="text-xl font-bold">Deep Analytics</h3>
          <p className="text-muted-foreground leading-relaxed">Track device types, locations, and real-time click counts to understand your audience better.</p>
        </div>
        <div className="glass p-8 rounded-3xl space-y-4 hover:border-primary/30 transition-colors">
          <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
            <Zap className="h-6 w-6 text-amber-500" />
          </div>
          <h3 className="text-xl font-bold">Light Speed</h3>
          <p className="text-muted-foreground leading-relaxed">Experience ultra-fast redirections and a smooth, lag-free user interface across all devices.</p>
        </div>
      </div>
      
      {/* FAQ Section */}
      <section className="w-full space-y-12 pb-20">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Common Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about our link shortener.</p>
        </div>
        
        <Accordion type="multiple" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="glass px-6 rounded-2xl border-0 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-6">
              How does the URL shortener work?
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
              When you enter a long URL, our system generates a unique shortened version of that URL. 
              This shortened URL redirects to the original long URL instantly when anyone clicks it.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2" className="glass px-6 rounded-2xl border-0 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-6">
              Do I need an account to use ShortIt?
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
              Yes, creating an account allows you to manage ALL your links in one dashboard, 
              view detailed analytics, and customize your URLs with branded aliases.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3" className="glass px-6 rounded-2xl border-0 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-6">
              What analytics are available?
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
              We provide total click counts, geolocation data (city/country), and device 
              breakdowns (mobile/desktop) so you can optimize your marketing efforts.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
};

export default LandingPage;
