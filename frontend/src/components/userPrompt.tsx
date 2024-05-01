import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const UserPrompt = ({
  setChar,
}: {
  setChar: React.Dispatch<React.SetStateAction<null>>;
}) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        if (error instanceof Error) {
          showToast(error);
        }
        setLoading(false);
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
      <Button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Send"}
      </Button>
    </form>
  );
};

export default UserPrompt;
