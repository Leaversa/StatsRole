import { useEffect, useState } from "react";
import UserPrompt from "@/components/userPrompt";
import Sheet from "@/components/sheet/sheet";
import { Toaster } from "@/components/ui/toaster";
import useLocalStorage from "@/hooks/useLocalStorage";

function App() {
  const [pastChar, setPastChar] = useLocalStorage("char");
  const [char, setChar] = useState(pastChar ? pastChar : null);

  useEffect(() => {
    setPastChar(char);
  }, [char, pastChar, setPastChar]);
  return (
    <main>
      <section className="w-full px-6 md:py-12 lg:py-16">
        <div className="space-y-5">
          <div className="space-y-5 mx-auto">
            <div className="bg-primary title-highlight w-fit mx-auto">
              <h1 className="text-3xl font-display px-10 py-2 text-primary-foreground sm:text-4xl md:text-5xl text-center ">
              StatsRole
            </h1>
            </div>
            <p className="text-gray-800 font-bold text-center">
              Use simple text prompts and character descriptions to generate a
              character sheet.
            </p>
          </div>
          <UserPrompt setChar={setChar} />
          {char && <Sheet character={char} />}
        </div>
      </section>
      <Toaster />
    </main>
  );
}

export default App;
