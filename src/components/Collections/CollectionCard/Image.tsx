import type { collection } from "../../../interfaces/collections";

interface ImageProps {
  imagePath: collection[`imagePath`];
  title: collection[`title`];
}
export default function Image({ imagePath, title }: ImageProps) {
  return (
    <div className="img-wrapper">
      <img src={imagePath} alt={title} className="img-fluid" />
    </div>
  );
}
