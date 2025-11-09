import { DarkModeToggle } from "./dark-mode-toggle";

export function Header() {
  return (
    <header className="fixed px-8 z-40 top-2.5 right-0">
      <div className="flex items-center gap-4">
        <DarkModeToggle />
      </div>
    </header>
  );
}
