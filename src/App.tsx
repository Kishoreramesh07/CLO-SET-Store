import { useEffect } from "react";
import { useCollectionStore } from "./store/useCollectionStore";
import "./styles/main.scss";
import { Collections } from "./components/Collections";

function App() {
  const { fetchCollections } = useCollectionStore();

  useEffect(() => {
    fetchCollections(
      `https://closet-recruiting-api.azurewebsites.net/api/data`
    );
  }, []);

  return (
    <div className="bg-wrap">
      <div className="container">
        <Collections />
      </div>
    </div>
  );
}

export default App;
