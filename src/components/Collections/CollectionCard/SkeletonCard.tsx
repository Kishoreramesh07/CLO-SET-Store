export default function SkeletonCard() {
  return (
    <div className="card-wrapper animate-pulse">
      <div className="img-wrapper img-wrapper-skeleton"></div>
      <div className="details-wrapper">
        <div className="details details-skeleton"></div>
        <div className="pricing-skeleton"></div>
      </div>
    </div>
  );
}
