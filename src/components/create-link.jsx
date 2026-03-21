import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Error from "./error";
import * as yup from "yup";
import useFetch from "@/hooks/use-fetch";
import {createUrl} from "@/db/apiUrls";
import {BarLoader} from "react-spinners";
import {UrlState} from "@/context";
import {QRCode} from "react-qrcode-logo";
import { Plus, Link as LinkIcon, Type, Globe, Sparkles } from "lucide-react";

export function CreateLink() {
  const {user} = UrlState();
  const navigate = useNavigate();
  const ref = useRef();
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, {...formValues, user_id: user.id});

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data]);

  const createNewLink = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, {abortEarly: false});
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger asChild>
        <Button className="premium-gradient text-white rounded-2xl px-6 h-12 font-bold shadow-lg hover:shadow-primary/25 transition-all">
          <Plus className="h-4 w-4 mr-2" />
          Create New Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md glass border-0 rounded-[2.5rem] p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="p-8 pb-4">
          <DialogTitle className="font-black text-3xl tracking-tight flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Shorten Link
          </DialogTitle>
        </DialogHeader>
        
        <div className="px-8 pb-8 space-y-6">
          <div className="flex flex-col items-center justify-center p-6 bg-white/50 rounded-3xl border border-dashed border-primary/20">
             {formValues?.longUrl ? (
               <div className="animate-in fade-in zoom-in duration-300">
                  <QRCode ref={ref} size={180} value={formValues?.longUrl} logoImage="/logo.png" qrStyle="dots" eyeRadius={10} />
               </div>
             ) : (
                <div className="h-[180px] flex flex-col items-center justify-center text-muted-foreground gap-2">
                    <LinkIcon className="h-10 w-10 opacity-20" />
                    <p className="text-xs font-medium uppercase tracking-widest">QR Preview</p>
                </div>
             )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
               <div className="relative group">
                  <Type className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="title"
                    placeholder="Link Title (e.g. Portfolio)"
                    value={formValues.title}
                    onChange={handleChange}
                    className="pl-10 h-12 glass border-border/50 focus:border-primary/50 transition-all rounded-xl"
                  />
               </div>
               {errors.title && <Error message={errors.title} />}
            </div>

            <div className="space-y-2">
               <div className="relative group">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="longUrl"
                    placeholder="Enter Destination URL"
                    value={formValues.longUrl}
                    onChange={handleChange}
                    className="pl-10 h-12 glass border-border/50 focus:border-primary/50 transition-all rounded-xl"
                  />
               </div>
               {errors.longUrl && <Error message={errors.longUrl} />}
            </div>

            <div className="space-y-2">
               <div className="flex items-center gap-2">
                  <div className="flex-1 relative group">
                     <span className="absolute left-3 top-3.5 text-xs font-bold text-muted-foreground pointer-events-none">short.it/</span>
                     <Input
                        id="customUrl"
                        placeholder="custom-slug"
                        value={formValues.customUrl}
                        onChange={handleChange}
                        className="pl-[68px] h-12 glass border-border/50 focus:border-primary/50 transition-all rounded-xl"
                     />
                  </div>
               </div>
               <p className="text-[10px] text-muted-foreground px-1">Optional custom alias for your link</p>
            </div>
          </div>
          
          {error && <Error message={error.message} />}

          <DialogFooter className="pt-2">
            <Button
              type="button"
              onClick={createNewLink}
              disabled={loading}
              className="w-full h-12 premium-gradient text-white rounded-xl font-bold shadow-lg hover:shadow-primary/25 transition-all"
            >
              {loading ? <BarLoader width={40} color="#ffffff" /> : "Generate Link"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
