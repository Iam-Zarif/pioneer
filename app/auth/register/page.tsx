"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import registerImg from "@/public/register.svg";
import {
  validateRegister,
  RegisterFormValues,
  validatePassword,
} from "@/validations/registerValidation";
import { useAuth } from "@/contexts/AuthAndProfileContext";

export default function RegisterPage() {
  const { signup, loading, error, login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<RegisterFormValues>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<RegisterFormValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    let fieldError: string | undefined = "";
    if (name === "password") {
      fieldError = validatePassword(value);
    } else if (name === "confirmPassword") {
      fieldError = value !== form.password ? "Passwords do not match" : "";
    } else {
      const validationErrors = validateRegister({ ...form, [name]: value });
      fieldError = validationErrors[name as keyof RegisterFormValues];
    }

    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateRegister(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await signup(form);
        await login({ email: form.email, password: form.password });
        router.push("/");
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Signup failed:", err.message);
        } else {
          console.error("Signup failed");
        }
      }
    }
  };

  return (
    <main className="grid min-h-screen items-center justify-center grid-cols-12 w-full">
      <figure className="hidden md:flex h-screen w-full col-span-5">
        <Image 
          src={registerImg}
          alt="register illustration"
          className="object-cover w-full h-full"
          priority
        />
      </figure>

      <div className="col-span-12 md:col-span-7 bg-white px-4 lg:px-0 h-full flex items-center justify-center">
        <section className="flex max-w-md mx-auto w-full items-center flex-col gap-2">
          <h1 className="text-3xl font-bold text-dark">Create your account</h1>
          <p className="text-dark-gray">
            Start managing your tasks efficiently
          </p>

          <form
            className="flex flex-col gap-4 mt-8 w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col md:flex-row w-full gap-4">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-black font-medium text-sm">
                  First Name
                </label>
                <input
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  className="border placeholder:text-gray text-sm font-light border-input rounded-lg p-2.5 focus:outline-none"
                />
                {errors.first_name && (
                  <p className="text-red-500 text-xs">{errors.first_name}</p>
                )}
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="text-black font-medium text-sm">
                  Last Name
                </label>
                <input
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  className="border placeholder:text-gray text-sm font-light border-input rounded-lg p-2.5 focus:outline-none"
                />
                {errors.last_name && (
                  <p className="text-red-500 text-xs">{errors.last_name}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-black font-medium text-sm">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                className="border placeholder:text-gray text-sm font-light border-input rounded-lg p-2.5 focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-black font-medium text-sm">Password</label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                className="border placeholder:text-gray text-sm font-light border-input rounded-lg p-2.5 focus:outline-none"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <label className="text-black font-medium text-sm">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                type="password"
                className="border placeholder:text-gray text-sm font-light border-input rounded-lg p-2.5 focus:outline-none"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-primary text-white font-medium rounded-lg p-2 hover:bg-[#3b5dcc] cursor-pointer transition"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            {error && (
              <p className="text-red-500 font-normal text-sm">{error}</p>
            )}

            <div className="flex justify-center items-center gap-1">
              <p className="text-dark-gray font-normal">
                Already have an account?
              </p>
              <Link
                href="/auth/login"
                className="text-primary hover:text-[#3b5dcc]"
              >
                Log in
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
