import Link from "next/link";
import React from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "Projetos", href: "/projects" },
  { name: "Contatos", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start pt-32 w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-10 animate-fade-in">
        <ul className="flex items-center justify-center gap-6 text-xl sm:text-2xl font-medium text-zinc-300">
          {navigation.map((item, index) => (
            <React.Fragment key={item.href}>
              <Link
                href={item.href}
                className="hover:text-white transition-colors duration-300"
              >
                {item.name}
              </Link>

              {index < navigation.length - 1 && (
                <span className="text-zinc-500">|</span>
              )}
            </React.Fragment>
          ))}
        </ul>
      </nav>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />

      <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
        Simplify Tech
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
    </div>
  );
}
