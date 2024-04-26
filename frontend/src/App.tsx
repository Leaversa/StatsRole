import { useEffect, useState } from "react";
import UserPrompt from "@/components/userPrompt";
import Sheet from "@/components/sheet";
import { Toaster } from "@/components/ui/toaster";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  
  const [chars, setChars] = useLocalStorage("char");
  const [char, setChar] = useState(chars ? chars : null);

  useEffect(() => {
    console.log(chars);
    setChars(char);
  }, [char, setChars, chars]);
  return (
    <main>
      <section className="w-full px-6 md:py-12 lg:py-16">
        <div className="space-y-5">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tighter text-red-800 sm:text-4xl md:text-5xl">
              Creative Character Generation
            </h1>
            <p className="text-gray-800">
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
