import { useEffect } from "react";
import { useCollectionStore } from "./store/useCollectionStore";
import "./styles/main.scss";
import { Collections } from "./components/Collections";
import Filter from "./components/Filter";
import Search from "./components/Search";
import Sort from "./components/Sort";
import Header from "./components/Header";

function App() {
  const { fetchCollections } = useCollectionStore();

  useEffect(() => {
    fetchCollections(
      `https://closet-recruiting-api.azurewebsites.net/api/data`
    );
  }, []);

  return (
    <div className="bg-wrap">
      <Header />
      <div className="container">
        <Search />
        <Filter />
        <Sort />
        <Collections />
      </div>
    </div>
  );
}

export default App;
