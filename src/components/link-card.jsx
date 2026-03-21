/* eslint-disable react/prop-types */
import {Copy, Download, LinkIcon, Trash, ExternalLink, Calendar} from "lucide-react";
import {Link} from "react-router-dom";
import {Button} from "./ui/button";
import useFetch from "@/hooks/use-fetch";
import {deleteUrl} from "@/db/apiUrls";
import {BarLoader} from "react-spinners";

const LinkCard = ({url = [], fetchUrls}) => {
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

  const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl, url.id);

  const shortUrl = `${import.meta.env.VITE_DEPLOYED_URL}/${url?.custom_url ? url?.custom_url : url.short_url}`;

  return (
    <div className="flex flex-col md:flex-row gap-6 glass p-6 rounded-3xl border-0 shadow-lg hover:shadow-primary/5 transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
         <LinkIcon className="h-24 w-24 -rotate-12" />
      </div>

      <img
        src={url?.qr}
        className="h-32 w-32 object-contain bg-white rounded-2xl p-2 shadow-sm border border-border/10 self-center md:self-start group-hover:scale-105 transition-transform"
        alt="QR Code"
      />

      <div className="flex flex-col flex-1 space-y-3 min-w-0">
        <Link to={`/link/${url?.id}`} className="space-y-1 group/title">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-black tracking-tight group-hover/title:text-primary transition-colors truncate">
              {url?.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-primary text-lg font-bold group/link">
            <span className="truncate">{shortUrl}</span>
            <ExternalLink className="h-4 w-4 opacity-50 group-hover/link:opacity-100 transition-opacity" />
          </div>
        </Link>

        <div className="flex items-center gap-2 text-muted-foreground text-sm group/original">
          <LinkIcon className="h-3 w-3 shrink-0" />
          <span className="truncate">{url?.original_url}</span>
        </div>

        <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(url?.created_at).toLocaleDateString()}
            </div>
        </div>
      </div>

      <div className="flex md:flex-col justify-end gap-2 shrink-0 relative z-10">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-xl h-10 w-10 hover:bg-primary hover:text-white transition-all shadow-sm"
          onClick={() => {
            navigator.clipboard.writeText(shortUrl);
          }}
        >
          <Copy className="h-4 w-4" />
        </Button>
        <Button 
          variant="secondary"
          size="icon" 
          className="rounded-xl h-10 w-10 hover:bg-primary hover:text-white transition-all shadow-sm"
          onClick={downloadImage}
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary" 
          size="icon"
          className="rounded-xl h-10 w-10 hover:bg-destructive hover:text-white transition-all shadow-sm"
          onClick={() => fnDelete().then(() => fetchUrls())}
          disabled={loadingDelete}
        >
          {loadingDelete ? <BarLoader width={"100%"} color="#ffffff" /> : <Trash className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
