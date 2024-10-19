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
    <Card className="flex flex-col gap-4 justify-start min-w-[31rem] min-h-[37rem] text-gray shadow-2xl">
      <CardHeader className="hidden md:inline-block mt-[3.5rem] ">
        <CardTitle className="hidden md:block font-semibold text-[2.59rem]">
          Login your Account
        </CardTitle>
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
                    <FormLabel className="hidden md:block font-light text-lg">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your User ID"
                        className="font-sans min-h-12"
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
            <div className="pb-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="hidden md:block font-light text-lg">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="font-sans min-h-12"
                          autoComplete="on"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your Password"
                          {...field}
                        />
                        <div
                          className="w-2 h-2 absolute inset-y-3 right-6 items-center text-gray"
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
          <CardContent className="pb-4 pt-3 ">
            {isPending ? (
              <Button disabled className="w-full p-6">
                <Loader className="mr-2 h-5 w-5 animate-spin text-lg" />
              </Button>
            ) : (
              <Button type="submit" className="w-full font-sans p-6 text-lg">
                Log in
              </Button>
            )}
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
