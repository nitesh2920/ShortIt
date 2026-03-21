import DeviceStats from "@/components/device-stats";
import LocationStats from "@/components/location-stats";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {UrlState} from "@/context";
import {getClicksForUrl} from "@/db/apiClicks";
import {deleteUrl, getUrl} from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import {Copy, Download, LinkIcon, Trash, ExternalLink, Calendar, MousePointer2} from "lucide-react";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {BarLoader} from "react-spinners";

const LinkPage = () => {
  const navigate = useNavigate();
  const {user} = UrlState();
  const {id} = useParams();

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, {id, user_id: user?.id});

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!error && loading === false) fnStats();
  }, [loading, error]);

  if (error) {
    navigate("/dashboard");
  }

  const shortLink = url?.custom_url ? url?.custom_url : url?.short_url;
  const fullShortLink = `${import.meta.env.VITE_DEPLOYED_URL}/${shortLink}`;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {(loading || loadingStats) && (
        <BarLoader className="mb-4 rounded-full" width={"100%"} color="oklch(var(--primary))" />
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Link Info */}
        <div className="flex flex-col gap-6 lg:w-2/5">
          <div className="space-y-4">
             <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                {url?.title}
             </h1>
             
             <div className="flex flex-col gap-2">
                <a
                  href={fullShortLink}
                  target="_blank"
                  className="text-2xl md:text-3xl text-primary font-bold hover:underline break-all flex items-center gap-2 group"
                >
                  {fullShortLink}
                  <ExternalLink className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
                
                <a
                  href={url?.original_url}
                  target="_blank"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors break-all text-sm md:text-base"
                >
                  <LinkIcon className="h-4 w-4 shrink-0" />
                  {url?.original_url}
                </a>
             </div>

             <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                <Calendar className="h-4 w-4" />
                Created on {new Date(url?.created_at).toLocaleDateString()}
             </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="rounded-2xl h-12 px-6 shadow-sm hover:bg-primary hover:text-white transition-all"
              onClick={() => navigator.clipboard.writeText(fullShortLink)}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button 
                variant="secondary"
                className="rounded-2xl h-12 px-6 shadow-sm hover:bg-primary hover:text-white transition-all"
                onClick={downloadImage}
            >
              <Download className="h-4 w-4 mr-2" />
              QR
            </Button>
            <Button
              variant="secondary"
              className="rounded-2xl h-12 px-6 shadow-sm hover:bg-destructive hover:text-white transition-all"
              onClick={() =>
                fnDelete().then(() => {
                  navigate("/dashboard");
                })
              }
              disabled={loadingDelete}
            >
              {loadingDelete ? (
                <BarLoader width={40} color="#ffffff" />
              ) : (
                <>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                </>
              )}
            </Button>
          </div>

          <Card className="glass border-0 shadow-2xl overflow-hidden rounded-[2.5rem] group mt-4">
            <CardContent className="p-8 flex justify-center bg-white/50 backdrop-blur-sm">
                <img
                    src={url?.qr}
                    className="w-full max-w-[280px] aspect-square object-contain group-hover:scale-105 transition-transform duration-500"
                    alt="QR Code"
                />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Statistics */}
        <div className="lg:w-3/5 space-y-6">
            <Card className="glass border-0 shadow-xl rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-3xl font-black">Link Performance</CardTitle>
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <MousePointer2 className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-10">
                    <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
                        <p className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Total Engagements</p>
                        <div className="text-5xl font-black">{stats?.length || 0}</div>
                        <p className="text-muted-foreground text-xs mt-2">Clicks generated from this link</p>
                    </div>

                    {stats && stats.length > 0 ? (
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                                    Top Locations
                                </h3>
                                <div className="glass bg-white/30 rounded-3xl p-4">
                                    <LocationStats stats={stats} />
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                                    Device Distribution
                                </h3>
                                <div className="glass bg-white/30 rounded-3xl p-4">
                                    <DeviceStats stats={stats} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border">
                            <p className="text-muted-foreground font-medium">
                                {loadingStats ? "Analyzing data..." : "No engagement data available yet."}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default LinkPage;
