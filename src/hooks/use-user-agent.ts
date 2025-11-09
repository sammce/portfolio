import { useEffect, useState } from "react";

export type OSPlatform = "macOS" | "Windows" | "Linux";

export function useUserAgent() {
  const [platform, setPlatform] = useState<OSPlatform>("Windows");

  useEffect(() => {
    const determinePlatform = () => {
      if (navigator.userAgent.includes("Mac")) {
        setPlatform("macOS");
      } else if (navigator.userAgent.includes("Windows")) {
        setPlatform("Windows");
      } else if (navigator.userAgent.includes("Linux")) {
        setPlatform("Linux");
      }
    };

    determinePlatform();
  }, []);

  return { platform };
}
