import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const UserPrompt = ({
  setChar,
  isLoading,
  setIsLoading,
}: {
  setChar: React.Dispatch<React.SetStateAction<null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [prompt, setPrompt] = useState("");
  const { toast } = useToast();

  const showToast = (error: Error) => {
    toast({
      variant: "destructive",
      duration: 5000,
      title: "Uh oh! Something went wrong.",
      description: error.message,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_SERVER}/prompt`, {
      method: "POST",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(JSON.parse(data));
        setChar(JSON.parse(data));
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error);
        if (error instanceof Error) {
          showToast(error);
        }
        setIsLoading(false);
      });
  };

  return (
    <form className="flex gap-4" onSubmit={handleSubmit}>
      <Textarea
        className="min-h-[60px] flex-1"
        placeholder="Type a prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Send"}
      </Button>
    </form>
  );
};

export default UserPrompt;
