import { useEffect } from "react";
import { useCollectionStore } from "../store/useCollectionStore";
import { scrollLimit, loadTriggerDelay } from "../constants";
import { debounce } from "../helpers";

export default function useInfiniteScroll() {
  const { loadMore } = useCollectionStore();

  const handleScroll = () => {
    if (
      document.body.scrollHeight - scrollLimit <
      window.scrollY + window.innerHeight
    ) {
      loadMore();
    }
  };

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, loadTriggerDelay);

    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  return null;
}
