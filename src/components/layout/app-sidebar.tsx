"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { motion, useAnimation, useScroll } from "motion/react";
import Link from "next/link";
import { sidebarItems, useSidebarLinks } from "@/context/sidebar-links";
import { useEffect, useRef } from "react";

const linksOrdered = sidebarItems.map((item) => item.title.toLowerCase());

const ITEM_HEIGHT = 52;
const HIGHLIGHT_HEIGHT = 40;
const TOTAL_HEIGHT = linksOrdered.length * 47; // Weird number because of padding/margin between items

function LinkViewHighlight({ inView }: { inView: string }) {
  const offsetMultiplier = linksOrdered.indexOf(inView) * ITEM_HEIGHT;
  const { scrollY } = useScroll();
  const controls = useAnimation();
  const didMount = useRef(false);

  useEffect(() => {
    const isScrollingUp = scrollY.get() < (scrollY.getPrevious() ?? 0);

    const delay = didMount.current ? 0.1 : 0;
    const duration = didMount.current ? 0.15 : 0;

    controls.start({
      bottom: TOTAL_HEIGHT - (offsetMultiplier + HIGHLIGHT_HEIGHT),
      transition: {
        duration,
        ease: "easeOut",
        delay: isScrollingUp ? delay : 0,
      },
    });

    controls.start({
      top: offsetMultiplier,
      transition: {
        duration,
        ease: "easeOut",
        delay: isScrollingUp ? 0 : delay,
      },
    });

    didMount.current = true;

    return () => {
      controls.stop();
    };
  }, [offsetMultiplier, controls, scrollY]);

  return (
    <motion.div
      className="absolute top-0 left-0 right-0 bg-primary/20 rounded-lg"
      initial={{
        top: offsetMultiplier,
        bottom: TOTAL_HEIGHT - (offsetMultiplier + HIGHLIGHT_HEIGHT),
      }}
      animate={controls}
      transition={{ duration: 0.15 }}
    ></motion.div>
  );
}

export function AppSidebar() {
  const { isMobile, setOpenMobile } = useSidebar();
  const { setLastNavigation, inView } = useSidebarLinks();

  const handleClick = (id: string) => () => {
    if (isMobile) {
      setOpenMobile(false);
    }

    setLastNavigation(id);
  };

  return (
    <Sidebar variant="inset" className="p-0">
      <SidebarHeader className="w-full flex items-center justify-center overflow-hidden mt-1.5">
        <Link href="/">
          <motion.h1 className="text-2xl tracking-tight font-semibold text-primary">
            {"{"}
            <span className="text-foreground">sammce</span>
            {"}"}
          </motion.h1>
        </Link>
      </SidebarHeader>
      {isMobile && <SidebarSeparator className="my-3 ml-0" />}
      <SidebarContent className="px-4">
        <SidebarGroup className="h-full md:justify-center">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 md:mt-20 relative">
              <LinkViewHighlight inView={inView} />
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="h-10 px-4 transition-colors hover:bg-primary/25 dark:hover:bg-primary/15 focus-visible:bg-primary/25 dark:focus-visible:bg-primary/15 active:bg-primary/15 dark:active:bg-primary/5"
                    // Remove the hash from the href
                    onClick={handleClick(item.href.slice(1, item.href.length))}
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
