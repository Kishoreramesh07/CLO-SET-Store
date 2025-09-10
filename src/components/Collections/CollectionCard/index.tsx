import type { collection } from "../../../interfaces/collections";
import Details from "./Details";
import Image from "./Image";

export default function CollectionCard({
  collection,
}: {
  collection: collection;
}) {
  return (
    <div className="card-wrapper">
      <Image imagePath={collection?.imagePath} title={collection?.title} />
      <Details collection={collection} />
    </div>
  );
}
