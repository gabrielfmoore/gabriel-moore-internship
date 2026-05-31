import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

window.addEventListener("beforeunload", () => {
  sessionStorage.setItem(
    `scroll:${window.location.pathname}`,
    window.scrollY
  );
});

const scrollTo = (top) => {
  window.scrollTo({ top, left: 0, behavior: "auto" });
};

const isReload = () =>
  performance.getEntriesByType("navigation")[0]?.type === "reload";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const previousPathname = useRef(null);

  useLayoutEffect(() => {
    if (previousPathname.current === null) {
      previousPathname.current = pathname;

      if (isReload()) {
        const saved = sessionStorage.getItem(`scroll:${pathname}`);
        if (saved !== null) {
          scrollTo(Number(saved));
        }
      }

      return;
    }

    if (previousPathname.current !== pathname) {
      scrollTo(0);
      sessionStorage.setItem(`scroll:${pathname}`, "0");
      previousPathname.current = pathname;
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
