"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./button";
import { Separator } from "./separator";
import { useSettings } from "@/hooks/use-settings";

const MotionCard = motion.create(Card);

const transitions = {
  animate: { transition: { duration: 0.3 } },
  exit: { transition: { duration: 0.2 } },
};

const animations = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, ...transitions.animate },
  exit: { opacity: 0, scale: 0.95, ...transitions.exit },
};

type TailorModalProps = {
  onShouldRush: () => void;
  onCancel: () => void;
};

function TailorModal({ onCancel, onShouldRush }: TailorModalProps) {
  return (
    <MotionCard {...animations} className="min-w-[400px]">
      <CardHeader>
        <CardTitle className="text-lg">About this portfolio</CardTitle>
        <CardDescription className="space-y-4">
          <p>
            The intended way to experience my portfolio is to be taken on a
            journey through my career as a developer.
          </p>
          <p>This takes ~TBD minutes to complete.</p>
          <p>
            You can reset the experience at any time using the settings menu on
            the top right of the page.
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-stretch space-y-2 justify-between">
        <Separator />
        <Button variant="link" className="p-0" onClick={onShouldRush}>
          I&apos;m in a rush
        </Button>
        <Button onClick={onCancel}>Okay</Button>
      </CardContent>
    </MotionCard>
  );
}

export function Experience() {
  const { shouldRush, startRushing, stopRushing } = useSettings();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <AnimatePresence>
        {shouldRush === null && (
          <TailorModal onShouldRush={startRushing} onCancel={stopRushing} />
        )}
      </AnimatePresence>
    </div>
  );
}
