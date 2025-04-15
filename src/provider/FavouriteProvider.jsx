import { FavouritesContext } from "../context";
import { useLocalStorage } from "../hooks";

const FaviouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage("favourites", []);

  const addToFavourite = (latitude, longitude, location) => {
    setFavourites([...favourites, { latitude, longitude, location }]);
  };

  const removeFromFavourite = (location) => {
    setFavourites(favourites.filter((item) => item.location !== location));
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourite, removeFromFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
export default FaviouriteProvider;
