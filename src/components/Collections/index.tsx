import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useCollectionStore } from "../../store/useCollectionStore";
import CollectionCard from "./CollectionCard";
import SkeletonCard from "./CollectionCard/SkeletonCard";

export const Collections = () => {
  const { visibleCollections, loading, limit } = useCollectionStore();
  useInfiniteScroll();

  return (
    <div className="card-container">
      {visibleCollections?.map((collection) => (
        <CollectionCard key={collection?.id} collection={collection} />
      ))}
      {loading && Array.from({ length: limit }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};
