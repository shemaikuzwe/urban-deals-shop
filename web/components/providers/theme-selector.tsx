"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTheme } from "next-themes"

export default function ThemeSelector() {
  const {theme,setTheme}=useTheme()

  return (
    <Card className="w-full max-w-md px-4">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-1">Theme</h2>
        <p className="text-sm mb-4">Choose Your favorite theme.</p>
        <RadioGroup value={theme} onValueChange={setTheme} className="flex space-x-2 max-md:flex-col">
          <div className="flex flex-col items-center">
            <Label
              htmlFor="light"
              className="mb-2 cursor-pointer"
              onClick={() => setTheme("light")}
            >
              <div className="w-40 h-32 bg-white rounded-lg border-2 border-zinc-600 p-2 mb-2">
                <div className="w-full h-3 bg-zinc-200 rounded mb-2" />
                <div className="w-full h-3 bg-zinc-200 rounded mb-2" />
                <div className="w-full h-3 bg-zinc-200 rounded" />
              </div>
            </Label>
            <RadioGroupItem value="light" id="light" className="sr-only" />
            <Label htmlFor="light" className="text-sm">
              Light
            </Label>
          </div>
          <div className="flex flex-col items-center">
            <Label
              htmlFor="dark"
              className="mb-2 cursor-pointer"
              onClick={() => setTheme("dark")}
            >
              <div className="w-40 h-32 bg-zinc-800 rounded-lg border-2 border-zinc-600 p-2 mb-2">
                <div className="w-full h-3 bg-zinc-600 rounded mb-2" />
                <div className="w-full h-3 bg-zinc-600 rounded mb-2" />
                <div className="w-full h-3 bg-zinc-600 rounded" />
              </div>
            </Label>
            <RadioGroupItem value="dark" id="dark" className="sr-only" />
            <Label htmlFor="dark" className="text-sm">
              Dark
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
