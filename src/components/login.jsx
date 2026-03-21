import {useNavigate, useSearchParams} from "react-router-dom";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import {BarLoader} from "react-spinners";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import Error from "./error";
import {login} from "@/db/apiAuth";
import useFetch from "@/hooks/use-fetch";
import {UrlState} from "@/context";
import { Mail, Lock, LogIn } from "lucide-react";

const Login = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const {data, error, loading, fn: fnLogin} = useFetch(login, formData);
  const {fetchUser} = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [data, error]);

  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });

      await schema.validate(formData, {abortEarly: false});
      await fnLogin();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
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
              placeholder="Password"
              onChange={handleInputChange}
              className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all rounded-xl"
            />
          </div>
          {errors.password && <Error message={errors.password} />}
        </div>
        
        {error && <Error message={error.message} />}
      </div>

      <Button 
        onClick={handleLogin} 
        disabled={loading}
        className="w-full h-12 premium-gradient text-white rounded-xl font-semibold shadow-lg hover:shadow-primary/25 transition-all mt-4"
      >
        {loading ? <BarLoader width={"100%"} color="#ffffff" /> : (
          <div className="flex items-center justify-center gap-2">
            <LogIn className="h-4 w-4" />
            Sign In
          </div>
        )}
      </Button>
    </div>
  );
};

export default Login;
