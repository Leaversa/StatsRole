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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(JSON.parse(data).name);
      setChar(JSON.parse(data));
    } catch (error) {
      if (error instanceof Error) {
        showToast(error);
      }
    }
    setLoading(false);
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
