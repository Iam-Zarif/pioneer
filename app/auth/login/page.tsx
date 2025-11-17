  "use client";

  import login from "@/public/login.svg";
  import Image from "next/image";
  import Link from "next/link";
  import { useState } from "react";
  import { useRouter } from "next/navigation";
  import { useAuth } from "@/contexts/AuthAndProfileContext";

  export default function LoginPage() {
    const { login: authLogin, user, loading, error, setUser } = useAuth();
    console.log("Current user in LoginPage:", user);
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [formError, setFormError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormError("");

      if (!form.email || !form.password) {
        setFormError("Please fill in all fields");
        return;
      }
      try {
        const profile = await authLogin(form);
        setUser(profile);
        if (profile) {
          router.push("/");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setFormError(err.message);
        } else {
          setFormError("Login failed");
        }
      }
    };

    return (
      <main className="grid min-h-screen items-center justify-center grid-cols-12 w-full">
        <figure className="hidden  lg:flex h-screen w-full col-span-5">
          <Image
            src={login}
            alt="Login illustration"
            className="object-cover w-full h-full"
            priority
          />
        </figure>

        <div className="col-span-12 lg:col-span-7 bg-white h-full flex items-center justify-center">
          <section className="flex max-w-md mx-auto w-full items-center flex-col gap-2">
            <h1 className="text-3xl font-bold text-dark">
              Log in to your account
            </h1>
            <p className="text-dark-gray">
              Start managing your tasks efficiently
            </p>

            <form
              className="flex flex-col gap-4 mt-8 w-full"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-black font-medium text-sm">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="border placeholder:text-gray text-sm font-light border-input rounded-lg p-2.5 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="password"
                  className="text-black font-medium text-sm"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="border placeholder:text-gray text-sm font-light border-input rounded-lg p-2.5 focus:outline-none"
                />
              </div>

              {(error || formError) && (
                <p className="text-red-500 text-sm">{error || formError}</p>
              )}

              <div className="w-full flex items-center justify-between">
                <label className="flex items-center gap-1">
                  <input type="checkbox" />
                  <span className="text-sm text-dark-gray font-normal">
                    Remember me
                  </span>
                </label>

                <Link href="#" className="text-sm text-primary font-medium">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="bg-primary text-white font-medium rounded-lg p-2 hover:bg-[#3b5dcc] cursor-pointer transition"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>

              <div className="flex justify-center items-center gap-1">
                <p className="text-dark-gray font-normal">
                  Don’t have an account?
                </p>
                <Link
                  href="/auth/register"
                  className="text-primary hover:text-[#3b5dcc]"
                >
                  Register now
                </Link>
              </div>
            </form>
          </section>
        </div>
      </main>
    );
  }
