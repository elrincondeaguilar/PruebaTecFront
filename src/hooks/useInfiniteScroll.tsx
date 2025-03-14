import { useEffect, useRef } from "react";

export default function useInfiniteScroll(
  callback: () => void,
  isFetching: boolean,
  hasMore: boolean
) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!hasMore || isFetching) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) callback();
    });

    if (lastElementRef.current)
      observerRef.current.observe(lastElementRef.current);

    return () => observerRef.current?.disconnect();
  }, [hasMore, isFetching, callback]);

  return lastElementRef;
}
