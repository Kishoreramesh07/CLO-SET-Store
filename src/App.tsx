import { useEffect } from "react";
import { useCollectionStore } from "./store/useCollectionStore";
import "./styles/main.scss";
import { getPricingLabel } from "./helpers";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

function App() {
  const { visibleCollections, loading, error, fetchCollections } =
    useCollectionStore();
  useInfiniteScroll();
  useEffect(() => {
    fetchCollections(
      `https://closet-recruiting-api.azurewebsites.net/api/data`
    );
  }, []);

  return (
    <div className="bg-wrap">
      <div className="container">
        <div className="card-container">
          {visibleCollections.map(
            ({ id, creator, imagePath, title, pricingOption, price }) => {
              return (
                <div key={id} className="card-wrapper">
                  <div className="img-wrapper">
                    <img src={imagePath} alt={title} className="img-fluid" />
                  </div>
                  <div className="details-wrapper">
                    <div className="details">
                      <h4 className="title">{title}</h4>
                      <h5 className="creator">{creator}</h5>
                    </div>
                    <h3 className="pricingOption">
                      {getPricingLabel({ price, option: pricingOption })}
                    </h3>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
