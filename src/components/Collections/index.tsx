import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useCollectionStore } from "../../store/useCollectionStore";
import CollectionCard from "./CollectionCard";

export const Collections = () => {
  const { visibleCollections } = useCollectionStore();
  useInfiniteScroll();
  
  return (
    <div className="card-container">
      {visibleCollections?.map((collection) => (
        <CollectionCard key={collection?.id} collection={collection} />
      ))}
    </div>
  );
};
