// import { useState, useEffect, useRef } from 'react'
import './App.css'
// import MyButton from './myButton'
// import Panel from './Panel'
// import axios from 'axios'
import Swal from 'sweetalert2'

function App() {
  // const [ name, setName ] = useState('Jirayu')

  // const [ display, setDisplay ] = useState(false)

  // const [ products, setProducts ] = useState([])

  // const handleClick = () => {
  //   setName('Lxibel')
  // }

  // useEffect(() => {
  //   fetch('https://fakestoreapi.com/products')
  //     .then(res => res.json())
  //     .then(data => setProducts(data))
  // }, [])

  // const inputRef = useRef(null)
  // const focusInput = () => {
  //   inputRef.current.focus()
  // }

  // const [ products, setProducts ] = useState([
  //   { id: 1, barcode: '123', name: 'Product 1', price: 100 },
  //   { id: 2, barcode: '456', name: 'Product 2', price: 200 },
  //   { id: 3, barcode: '789', name: 'Product 3', price: 300 },
  // ])

  // const [ id, setId] = useState(0)
  // const [ barcode, setBarcode ] = useState('')
  // const [ name, setName ] = useState('')
  // const [ price, setPrice ] = useState(0)
  // const searchProduct = () => {
  //   const prod = products.filter(p => p.barcode === barcode)
  //   setId(prod[0].id)
  //   setName(prod[0].name)
  //   setPrice(prod[0].price)
  // }

  // const handleClick = () => {
  //   alert('Button clicked');
  // }

  // const url = 'https://jsonplaceholder.typicode.com/posts';
  // const payload = {
  //   id: 1, name: "jirayu"
  // }
  // const doGet = async () => axios.get(url);
  // const doPost = async () => axios.post(url, payload);
  // const doPut = async () => axios.put(url, payload);
  // const doDelete = async () => axios.delete(url);

  const handleClick = () => {
    Swal.fire({
      title: 'Hello World!',
      text: 'This is a sweet alert',
      icon: 'success'
    })
  }

  return (
    <>
      {/* <h1>Hello' { name }</h1> */}
      {/* <button onClick={ handleClick }>Chang Name</button> */}
      {/* <input type="text"  onChange={ e => setName(e.target.value) }/> */}

      {/* loop */}
      {/* <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name}: {product.price}
          </li>
        ))}
      </ul> */}

      {/* if else */}
      {/* ถ้าจริงจะโช ข้อความ */}
      {/* { display && <div>Message</div> }
      <button onClick={ () => setDisplay(!display) }>
        { display ? 'Hide' : 'Show' }
      </button> */}

      {/* <ul>
        {products.map(product => 
          <li key={product.id}>
            {product.title}
          </li>
        )}
      </ul> */}

      {/* <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button> */}

      {/* <input onChange={ e => setBarcode(e.target.value)}/>
      <button onClick={ searchProduct }>Search</button>
      <div>id: {id}</div>
      <div>name: {name}</div>
      <div>price: {price}</div> */}

      {/* <MyButton text="Click Me!" clickHandler={handleClick}/> */}

      {/* <Panel>
        <h1>Content</h1>
      </Panel> */}

      {/* <button onClick={doGet}>Get</button>
      <button onClick={doPost}>Post</button>
      <button onClick={doPut}>Put</button>
      <button onClick={doDelete}>Delete</button> */}

      {/* <button
        style={{
          background: 'red',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
        }}>
        Click Me!
      </button> */}
      <button onClick={handleClick}>
        Click swal!
      </button>
    </>
  )
}

export default App
