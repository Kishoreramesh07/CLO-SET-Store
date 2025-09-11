import { useEffect } from "react";
import { useCollectionStore } from "./store/useCollectionStore";
import "./styles/main.scss";
import { Collections } from "./components/Collections";
import Filter from "./components/Filter";
import Search from "./components/Search";

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
        <Search />
        <Filter />
        <Collections />
      </div>
    </div>
  );
}

export default App;
