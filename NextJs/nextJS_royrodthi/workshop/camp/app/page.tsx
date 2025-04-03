//rafce
import LoadingCrad from "@/components/card/LoadingCrad"
import LandmarkContainer from "@/components/home/LandmarkContainer"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"



const HomePage = async({ searchParams }: { searchParams: { search?: string, category?: string } }) => {
  //Search
  const { search, category } = await searchParams
  console.log(search)
  return (
    <section>
      <Suspense fallback={<LoadingCrad />}>
        <LandmarkContainer search={search} category={category} />
      </Suspense>
    </section>
  )
}
export default HomePage