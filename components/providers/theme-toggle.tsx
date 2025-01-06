import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";
import {  useState } from "react";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [checked, setChecked] = useState(false);
  function toggleMode() {
    setTheme(theme === "dark" ? "light" : "dark");
    setChecked(!checked);
    return;
  }
  return (
    <div className="flex gap-2">
      <Switch onClick={toggleMode} checked={checked} className=" bg-foreground" role="button" aria-label="switch"/>
    </div>
  );
}