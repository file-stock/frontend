import { useEffect, useState, useCallback } from "react";

const useInfiniteScroll = (callback: () => void) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    if (
      (window.innerHeight + document.documentElement.scrollTop) / document.documentElement.offsetHeight < 0.7 ||
      isFetching
    ) {
      return;
    }
    setIsFetching(true);
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetching) return;
    callback();
    setIsFetching(false); 
  }, [isFetching, callback]);
};

export default useInfiniteScroll;

