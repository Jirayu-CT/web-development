import Link from "next/link"
const url = "https://jsonplaceholder.typicode.com/todos";

const fetchTodos = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const res = await fetch(url);
    console.log(res)
    const data = await res.json()
    // console.log(data)
    return data
}

type Data = {
    id: string;
    completed: string;
    title: string;
    userId: string;
}

const AboutPage = async () => {
    //JS
    const data :Data[] = await fetchTodos()
    console.log("Hello from about page")
    console.log(data)
    return (
        <div>
            AboutPage
            {
                data.map((item, index) => {
                    return <li key={index}>{item.title}</li>
                })
            }
        </div>
    )
}
export default AboutPage