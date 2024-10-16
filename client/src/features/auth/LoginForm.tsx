import { z } from "zod";
import { Eye, EyeOff, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLogin } from "./useLogin";
import { useState } from "react";

const formSchema = z.object({
  userID: z.string().min(2).max(10),
  password: z.string().min(1, "Password is required").max(50),
});

export default function LoginForm() {
  const { login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userID: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const loading = toast.loading("Logging in, Please wait...");
    login(
      { ...data },
      {
        onSuccess: () => {
          toast.dismiss(loading);
          toast.success("Logged in successfully");
        },
        onError: () => {
          toast.dismiss(loading);
        },
      },
    );
  }
  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-full max-w-100 border-none bg-transparent shadow-none md:max-w-xs md:max-h-80 md:shadow-sm ">
      <CardHeader className="hidden md:inline-block py-7">
        <CardTitle className="hidden md:block">Login your Account</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div>
              <FormField
                control={form.control}
                name="userID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="hidden md:block">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your User ID"
                        className="font-sans"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardContent>
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="hidden md:block">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="font-sans"
                          autoComplete="on"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your Password"
                          {...field}
                        />
                        <div
                          className="w-2 h-2 absolute inset-y-2 right-6 items-center text-orange-100"
                          onClick={showPasswordToggle}
                        >
                          {showPassword ? <Eye /> : <EyeOff />}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardContent className="pb-11 pt-3">
            {isPending ? (
              <Button disabled className="w-full">
                <Loader className="mr-2 h-5 w-5 animate-spin" />
              </Button>
            ) : (
              <Button type="submit" className="w-full font-sans">
                Log in
              </Button>
            )}
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
