import {useEffect, useState} from "react";
import {BarLoader} from "react-spinners";
import {Filter, Link as LinkIcon, BarChart3, Search, Plus} from "lucide-react";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {CreateLink} from "@/components/create-link";
import LinkCard from "@/components/link-card";
import Error from "@/components/error";

import useFetch from "@/hooks/use-fetch";

import {getUrls} from "@/db/apiUrls";
import {getClicksForUrls} from "@/db/apiClicks";
import {UrlState} from "@/context";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {user} = UrlState();
  const {loading, error, data: urls, fn: fnUrls} = useFetch(getUrls, user.id);
  
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass border-0 overflow-hidden group shadow-xl transition-all hover:shadow-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Links Created</CardTitle>
            <LinkIcon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">
               {loading ? "..." : urls?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total shortened links in your account</p>
          </CardContent>
          <div className="h-1 premium-gradient opacity-20 group-hover:opacity-100 transition-opacity" />
        </Card>

        <Card className="glass border-0 overflow-hidden group shadow-xl transition-all hover:shadow-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Clicks</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-500 group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">
              {loadingClicks ? "..." : clicks?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total engagements across all links</p>
          </CardContent>
          <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-500 opacity-20 group-hover:opacity-100 transition-opacity" />
        </Card>
      </div>

      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight">My Managed Links</h1>
          <p className="text-muted-foreground text-sm">Organize and track your active short links</p>
        </div>
        <CreateLink />
      </div>

      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          type="text"
          placeholder="Filter links by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 h-12 glass border-border/50 focus-visible:ring-primary/20 text-md rounded-2xl shadow-sm"
        />
        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
      </div>

      {/* Links List */}
      <div className="space-y-4 pb-10">
        {(loading || loadingClicks) && !urls && (
          <BarLoader width={"100%"} color="oklch(var(--primary))" className="rounded-full shadow-sm" />
        )}
        
        {error && <Error message={error?.message} />}
        
        {!loading && filteredUrls?.length === 0 && (
          <div className="text-center py-20 glass rounded-3xl space-y-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
               <Search className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <p className="text-muted-foreground font-medium">No links found matching your search.</p>
          </div>
        )}

        {(filteredUrls || []).map((url, i) => (
          <LinkCard key={i} url={url} fetchUrls={fnUrls} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;











