"use client";
import register from "@/public/register.svg";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen items-center justify-center grid-cols-12 w-full">
      <figure className="hidden md:flex h-screen w-full col-span-5">
        <Image
          src={register}
          alt="register illustration"
          className="object-cover w-full h-full"
          priority
        />
      </figure>

      <section className="flex col-span-7 max-w-md mx-auto w-full items-center flex-col gap-2">
        <h1 className="text-3xl font-bold text-dark">
          Create your account
        </h1>
        <p className="text-dark-gray">Start managing your tasks efficiently</p>

        <form className="flex flex-col gap-4 mt-8 w-full">
          <div className="flex w-full gap-4">
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="firstName"
                className="text-black font-medium text-sm"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                className="border placeholder:text-gray text-sm font-light border-input rounded-lg p-2.5 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="lastName"
                className="text-black font-medium text-sm"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                className="border placeholder:text-gray text-sm font-light border-input rounded-lg p-2.5 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-black font-medium text-sm"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
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
              type="password"
              className="border placeholder:text-gray text-sm font-light border-input rounded-lg p-2.5 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="confirmPassword"
              className="text-black font-medium text-sm"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="border placeholder:text-gray text-sm font-light border-input rounded-lg p-2.5 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white font-medium rounded-lg p-2 hover:bg-[#3b5dcc] cursor-pointer transition"
          >
            Sign Up
          </button>

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
    </main>
  );
}
