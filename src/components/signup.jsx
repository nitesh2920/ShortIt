import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import Error from "./error";
import { Input } from "./ui/input";
import * as Yup from "yup";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signup } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { User, Mail, Lock, Image as ImageIcon, UserPlus, Camera } from "lucide-react";

const Signup = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData((prevState) => ({
        ...prevState,
        [name]: file,
      }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const { loading, error, fn: fnSignup, data } = useFetch(signup, formData);

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [data, error]);

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (error) {
      const newErrors = {};
      if (error?.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });

        setErrors(newErrors);
      } else {
        setErrors({ api: error.message });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4 py-2">
        <div className="relative group">
          <Avatar className="h-24 w-24 border-2 border-primary/20 bg-muted overflow-hidden shadow-inner">
            <AvatarImage src={preview} className="object-cover" />
            <AvatarFallback className="bg-primary/5 text-primary">
              <User className="h-10 w-10 opacity-20" />
            </AvatarFallback>
          </Avatar>
          <label className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform active:scale-95">
            <Camera className="h-4 w-4" />
            <input
              name="profile_pic"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
            />
          </label>
        </div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
          {formData.profile_pic ? formData.profile_pic.name : "Choose Profile Photo"}
        </p>
        {errors.profile_pic && <Error message={errors.profile_pic} />}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="relative group">
            <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              name="name"
              type="text"
              placeholder="Full Name"
              onChange={handleInputChange}
              className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all rounded-xl"
            />
          </div>
          {errors.name && <Error message={errors.name} />}
        </div>

        <div className="space-y-2">
          <div className="relative group">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              name="email"
              type="email"
              placeholder="Email address"
              onChange={handleInputChange}
              className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all rounded-xl"
            />
          </div>
          {errors.email && <Error message={errors.email} />}
        </div>

        <div className="space-y-2">
          <div className="relative group">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              name="password"
              type="password"
              placeholder="Create Password"
              onChange={handleInputChange}
              className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all rounded-xl"
            />
          </div>
          {errors.password && <Error message={errors.password} />}
        </div>

        {error && <Error message={error.message} />}
      </div>

      <Button
        onClick={handleSignup}
        disabled={loading}
        className="w-full h-12 premium-gradient text-white rounded-xl font-semibold shadow-lg hover:shadow-primary/25 transition-all mt-2"
      >
        {loading ? <BarLoader width={"100%"} color="#ffffff" /> : (
          <div className="flex items-center justify-center gap-2">
            <UserPlus className="h-4 w-4" />
            Create Account
          </div>
        )}
      </Button>
    </div>
  );
};

export default Signup;
