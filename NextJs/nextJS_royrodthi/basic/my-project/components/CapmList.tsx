import { fetchCamps } from "@/utils/actions"

const CapmList = async () => {
    const camps = await fetchCamps()
    console.log(camps)
    return <div>
        {
            camps.map((item, index) => {
                return <li key={index}>{item.title}</li>
            })
        }
    </div>;
}
export default CapmList