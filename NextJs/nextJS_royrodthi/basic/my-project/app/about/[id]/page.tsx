type ParamsType = {
  id: string
}

const AboutDetailsPage = async ({ params }: { params: ParamsType }) => {
  const { id } = await params
  console.log(id)
  return (
    <div>
      <h1>AboutDetailsPage</h1>
      <p>Details about {id}</p>
    </div>
  )
}
export default AboutDetailsPage