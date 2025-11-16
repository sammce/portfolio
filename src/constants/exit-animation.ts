const transition = { duration: 0.2, ease: "easeOut" };

export const enterExitAnimation = {
  initial: { opacity: 0, y: 20, ...transition },
  animate: { opacity: 1, y: 0, ...transition },
  exit: { opacity: 0, y: 20, ...transition },
};

export const enterExitAnimationNoY = {
  initial: { opacity: 0, ...transition },
  animate: { opacity: 1, ...transition },
  exit: { opacity: 0, ...transition },
};
