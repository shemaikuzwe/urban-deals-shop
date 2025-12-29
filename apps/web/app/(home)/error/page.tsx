import Link from "next/link";
import {  TriangleAlert } from "lucide-react";
import { Button } from "@urban-deals-shop/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@urban-deals-shop/ui/components/card";
import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@urban-deals-shop/ui/components/alert";

export const metadata: Metadata = {
  title: "Error",
  description: "Something went wrong",
};

interface Props {
  searchParams: Promise<{ error: string }>;
}
export default async function Page({ searchParams }: Props) {
  const { error } = await searchParams;
  return (
    <div className="flex  items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-lg mx-auto rounded-md">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-primary mb-2">
            Error
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Alert variant={"destructive"}>
                  <AlertTitle className={"rounded-md flex justify-center"}>
                    <TriangleAlert size={60} />
                  </AlertTitle>
                  <AlertDescription className={"mt-3 flex justify-center"}>
                    <span className={"text-md"}>
                      {error || "something went wrong"} Error
                    </span>
                  </AlertDescription>
                </Alert>
                <div className="w-full flex justify-center">
                  <Button
                    asChild
                    variant={"outline"}
                    className="w-full max-w-sm"
                  >
                    <Link href="/?login=true">Login Again</Link>
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
