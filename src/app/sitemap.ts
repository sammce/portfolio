import type { MetadataRoute } from "next";
import { getProjectInfo } from "@/components/atoms/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectInfo = await getProjectInfo();

  const projectUrls: MetadataRoute.Sitemap = projectInfo.map((project) => {
    const images: string[] = [];

    if (project.splash) {
      if (project.splash.startsWith("/")) {
        images.push(process.env.NEXT_PUBLIC_HOST_DOMAIN + project.splash);
      } else {
        images.push(project.splash);
      }
    }

    return {
      url: process.env.NEXT_PUBLIC_HOST_DOMAIN + project.href,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      images,
    };
  });

  return [
    {
      url: process.env.NEXT_PUBLIC_HOST_DOMAIN,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectUrls,
  ];
}
