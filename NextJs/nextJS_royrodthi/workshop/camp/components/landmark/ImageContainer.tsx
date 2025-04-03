import Image from "next/image"

const ImageContainer = ({mainImage, name}: {mainImage:string, name: string}) => {
  return (
    <section className="h-[300px] md:h-[500] relative mt-8">
        <Image
            src={mainImage}
            alt={name}
            sizes="100vw"
            className="w-full h-auto rounded-md object-cover"
            priority
            fill
        />
    </section>
  )
}
export default ImageContainer