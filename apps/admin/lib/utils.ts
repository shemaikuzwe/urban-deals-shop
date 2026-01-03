export function getKeyFromUrl(url: string): string {
  const parts = url.split("/");
  return parts[parts.length - 1];
}

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
