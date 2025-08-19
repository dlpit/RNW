import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Lock, ShieldCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "@/redux/auth/authSlice";
import { RootState, AppDispatch } from "@/redux/store";

const loginSchema = z.object({
  username: z.string().min(3, "Tối thiểu 3 ký tự"),
  password: z.string().min(6, "Tối thiểu 6 ký tự"),
});

export type AdminLoginValues = z.infer<typeof loginSchema>;

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user, error } = useSelector((s: RootState) => s.auth);

  const form = useForm<AdminLoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  // Check if already logged in via Redux state first, then localStorage fallback
  useEffect(() => {
    if (user?.role === "admin") {
      console.log("Redirecting to /admin - user from Redux:", user);
      navigate("/admin", { replace: true });
      return;
    }

    // Fallback check localStorage if Redux state is empty (page refresh case)
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      try {
        const parsedUser = JSON.parse(existingUser);
        if (parsedUser && parsedUser.role === "admin") {
          console.log(
            "Redirecting to /admin - user from localStorage:",
            parsedUser
          );
          navigate("/admin", { replace: true });
        }
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
        localStorage.removeItem("user");
      }
    }
  }, [user, navigate]);

  const onSubmit = async (values: AdminLoginValues) => {
    console.log("Submitting login form:", values.username);
    const result = await dispatch(
      adminLogin({ username: values.username, password: values.password })
    );
    console.log("Login dispatch result:", result);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          </div>
          <CardDescription>Đăng nhập để truy cập quản trị</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên đăng nhập</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="admin"
                        autoComplete="username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={loading}>
                <Lock className="mr-2 h-4 w-4" />
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Nhập username & mật khẩu admin.{" "}
                {error && <span className="text-destructive"> {error}</span>}
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLogin;
