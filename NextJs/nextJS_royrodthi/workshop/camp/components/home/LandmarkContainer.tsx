import { fetchLandmaeks, fetchLandmarksHero } from "@/actions/actions"
import LandmarkList from "./LandmarkList"
import { LandmarkCardProps } from "@/utils/types"
import Hero from "../hero/Hero"
import CategoriesList from "./CategoriesList"
import { categories } from "@/utils/category"
import EmptyList from "./EmptyList"


const LandmarkContainer = async({search, category}: {search?: string, category?: string}) => {

  const landmarks: LandmarkCardProps[] = await fetchLandmaeks({search, category})
  const landmarksHero: LandmarkCardProps[] = await fetchLandmarksHero()
  // console.log("landmarks Home: ", landmarks)

  // if(landmarks.length === 0) {
  //   return<EmptyList />
  // }

  return (
    <div>
      <Hero landmarks={landmarksHero}/>
      <CategoriesList search={search} category={category} />
      {
        landmarks.length === 0 
        ? <EmptyList heading='No results' btnText="Clear Filters" />
        : <LandmarkList landmarks={landmarks} />
      }
    </div>
  )
}
export default LandmarkContainer