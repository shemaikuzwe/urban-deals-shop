import { getGithubStars } from "@/lib/action/action";
import { Star } from "lucide-react";
import Link from "next/link";
interface GitHubStarsProps {
  repo: string;
}

export async function GitHubStars({ repo }: GitHubStarsProps) {
  const stars = await getGithubStars(repo);
  return (
    <Link
      target="_blank"
      href={"https://github.com/shemaikuzwe/urban-deals-shop"}
      className="flex items-center space-x-1"
    >
      <Star className="w-4 h-4 text-primary" />
      <span className=" text-primary">{stars}</span>
    </Link>
  );
}