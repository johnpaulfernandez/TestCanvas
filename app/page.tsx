import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Image className="size-24"
          src="/vercel.svg"
          alt="Logo"
          width="50"
          height="50">
        </Image>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sign in{" "}
          </a>
        </div>
      </div>

      <div className="flex flex-col relative z-[-1] flex place-items-center">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/logo.png"
          alt="Next.js Logo"
          width={400}
          height={100}
          priority
        />
        <h2 className="pt-8 text-2xl">AI-powered test creation & management for faster, smarter testing.</h2>
      </div>


      <div className="mb-32 grid text-center lg:mb-0 lg:max-w-5xl lg:grid-cols-1 lg:text-left">
        <a
          href="/tools/create"
          className="group rounded-lg border px-5 py-4 transition-colors border-gray-200 bg-gray-100 hover:bg-gray-200 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Get started{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Generate test plans in minutes.
          </p>
        </a>

      </div>
    </main >
  );
}
