import { type RefObject, useEffect } from "react";

type Event = MouseEvent | TouchEvent | KeyboardEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: (event: Event) => void,
) => {
  useEffect(() => {
    const eventHandler = (event: Event) => {
      const handleEvent = () => {
        const el = ref?.current;
        if (!el || el.contains((event?.target as Node) || null)) {
          return;
        }

        callback(event);
      };

      if (event instanceof KeyboardEvent) {
        if (event.key === "Escape") {
          callback(event);
        }
        return;
      }

      handleEvent();
    };

    document.addEventListener("mousedown", eventHandler);
    document.addEventListener("touchstart", eventHandler);
    document.addEventListener("keyup", eventHandler);

    return () => {
      document.removeEventListener("mousedown", eventHandler);
      document.removeEventListener("touchstart", eventHandler);
      document.removeEventListener("keypress", eventHandler);
    };
  }, [ref, callback]);
};
