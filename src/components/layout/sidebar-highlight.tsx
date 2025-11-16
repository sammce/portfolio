import { useSidebarLinks } from "@/context/sidebar-links";
import { slugify } from "@/lib/utils";
import { useScroll, useAnimation, motion } from "motion/react";
import { useEffect, useRef } from "react";

const ITEM_HEIGHT = 52;
const HIGHLIGHT_HEIGHT = 40;

export function SidebarHighlight() {
  const { scrollY } = useScroll();
  const { sidebarLinks, inView } = useSidebarLinks();
  const controls = useAnimation();
  const didMount = useRef(false);

  const linksOrdered = sidebarLinks.map((item) => slugify(item.title));
  const totalHeight = linksOrdered.length * 50; // Weird number because of padding/margin between items
  const offsetMultiplier = linksOrdered.indexOf(inView) * ITEM_HEIGHT;

  useEffect(() => {
    const isScrollingUp = scrollY.get() < (scrollY.getPrevious() ?? 0);

    const delay = didMount.current ? 0.1 : 0;
    const duration = didMount.current ? 0.15 : 0;

    controls.start({
      bottom: totalHeight - (offsetMultiplier + HIGHLIGHT_HEIGHT),
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
  }, [offsetMultiplier, controls, scrollY, totalHeight]);

  return (
    <motion.div
      className="absolute top-0 left-0 right-0 bg-primary/20 rounded-lg"
      initial={{
        top: offsetMultiplier,
        bottom: totalHeight - (offsetMultiplier + HIGHLIGHT_HEIGHT),
      }}
      style={{ minHeight: HIGHLIGHT_HEIGHT }}
      animate={controls}
      transition={{ duration: 0.15 }}
    ></motion.div>
  );
}
