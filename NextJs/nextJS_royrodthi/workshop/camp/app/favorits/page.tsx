import { fetchFavorits } from "@/actions/actions"
import EmptyList from "@/components/home/EmptyList"
import LandmarkList from "@/components/home/LandmarkList"

const FavoritsPage = async () => {
  const favorites = await fetchFavorits()

  if (favorites.length === 0) {
    return <EmptyList
      heading="No favorites"
      message="Please add some landmarks to your favorites."
    />
  }

  // <div className="flex flex-col items-center justify-center h-screen">
  //   <h2 className="text-xl font-bold"></h2>
  //   <p className="text-lg mb-4"></p>
  // </div>

  return <LandmarkList landmarks={favorites} />
}
export default FavoritsPage