import { z } from "zod";
import { cn } from "@/lib/utils";
import {
  CalendarRange,
  Check,
  ChevronsUpDown,
  Eye,
  EyeOff,
  Loader,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLogin } from "./useLogin";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCurrentPeriod } from "./useCurrentPeriod";
import { Period } from "@/types/Interface";
import SplashPage from "@/pages/SplashPage";

const formSchema = z.object({
  role: z
    .string({ required_error: "Please select a role" })
    .min(2, "Please select a role"),
  userID: z
    .string()
    .min(2, "Username must contain at least 2 characters(2)")
    .max(10, "Why is your username too long?"),
  password: z.string().min(1, "Password is required").max(50),
});

const roles = [
  { label: "Dean", value: "Dean" },
  { label: "Assistant Dean", value: "Assistant Dean" },
  { label: "Program Head", value: "Program Head" },
  { label: "Faculty", value: "Faculty" },
  { label: "Student", value: "Student" },
];

export default function LoginForm() {
  const { login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [openRole, setOpenRole] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
      userID: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: "Logging in",
      description: "Please Wait",
      duration: 3000,
    });
    login(
      { ...data },
      {
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Success!",
            description: "Welcome to COMS",
            duration: 3000,
          });
        },
      },
    );
  }
  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const formatPeriod = (current: Period) => {
    let formattedPeriod;
    if (current.Semester === 1) {
      formattedPeriod = `${current.Semester}st Semester 20${current.School_Year.slice(0, 2)}-20${current.School_Year.slice(2)}`;
    } else if (current.Semester === 2) {
      formattedPeriod = `${current.Semester}nd Semester 20${current.School_Year.slice(0, 2)}-20${current.School_Year.slice(2)}`;
    } else {
      formattedPeriod = `${current.Semester}Semester 20${current.School_Year.slice(0, 2)}-20${current.School_Year.slice(2)}`;
    }

    return formattedPeriod;
  };
  const { isLoading, response, error } = useCurrentPeriod();
  if (isLoading) return <div><SplashPage /></div>
  if (error) return;
  let current;
  if (response?.current_period) {
    current = formatPeriod(response?.current_period);
  }

  return (
    <Card className="flex flex-col gap-1 justify-start min-w-[31rem] min-h-[37rem] text-gray shadow-2xl">
      <CardHeader className="hidden md:inline-block mt-[1rem] ">
        <CardTitle className="hidden md:block font-semibold text-[2.59rem] ">
          Login your Account
          <p className="text-[1rem] font-normal flex gap-2 mt-2 tracking-tight">
            <CalendarRange />
            {current}
          </p>
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="hidden md:block font-light text-lg">
                      Role
                    </FormLabel>
                    <Popover open={openRole} onOpenChange={setOpenRole}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            {...field}
                            className={cn(
                              "min-w-full min-h-12 justify-between font-sans",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? roles.find((role) => role.value === field.value)
                                ?.label
                              : "Select your role"}
                            <ChevronsUpDown className="m1-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[27.6rem] p-0">
                        <Command>
                          <CommandList>
                            <CommandEmpty>No selected role</CommandEmpty>
                            <CommandGroup>
                              {roles.map((role) => (
                                <CommandItem
                                  value={role.label}
                                  key={role.value}
                                  onSelect={() => {
                                    form.setValue("role", role.value);
                                    setOpenRole(false);
                                  }}
                                >
                                  {role.label}
                                  <Check
                                    className={cn(
                                      "m1-auto",
                                      role.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
              <Button
                type="submit"
                className="w-full font-sans p-6 text-lg mb-7"
              >
                Log in
              </Button>
            )}
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
