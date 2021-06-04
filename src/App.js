import './App.css';
import { useState, useEffect } from 'react'
import Axios from 'axios'

function App() {
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [listOfFriends, setListOfFriends] = useState([])
  //const [newAge]=useState("")

  const addFriend = () => {
    Axios.post('https://mernbackendgulay.herokuapp.com/addFriend', {name: name,age: age})
      .then((response)=>{
        setListOfFriends([...listOfFriends,{_id:response.data._id,name:name,age:age}])
      })

  }

  useEffect(() => {
    Axios.get('https://mernbackendgulay.herokuapp.com/read',)
      .then((response) => {
        setListOfFriends(response.data);
      })
      .catch(() => {
        console.log('Error');
      })
  }, [])

  const updateFriendAge=(id)=>{ 
    Axios.put('https://mernbackendgulay.herokuapp.com/update',{id:id,age:age})
      .then(()=>{
          setListOfFriends(listOfFriends.map((val)=>{
              return val._id===id?{id:id,age:age,name:val.name}:val
          }))
      })
  }

  const deleteFriend=(id)=>{
    Axios.delete(`https://mernbackendgulay.herokuapp.com/delete/${id}`)
      .then(()=>{
        setListOfFriends(listOfFriends.filter((val)=>{
          return val._id!==id
        }))
      })
  }

  return (
    <div className="App">
      <div className="h-screen font-sans login bg-cover">
        <div className="container mx-auto h-full flex flex-1 justify-center items-center">
          <div className="w-full max-w-xl">
            <div className="leading-loose">
              <form className="max-w-xl m-4 px-8 py-4 bg-white bg-opacity-25 rounded-lg shadow-xl">
                <p className="text-white font-medium text-center text-3xl font-bold">Friends</p>
                <div className="mb-2">
                  <label className="block text-sm text-left mb-2 text-white font-bold tracking-wider" htmlFor="email">Friend</label>
                  <input onChange={(e) => { setName(e.target.value) }} className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" type="text" id="food" placeholder="Ad giriniz..." aria-label="email" required />
                </div>
                <div className="mb-2">
                  <label className="block text-sm text-left mb-2 text-white font-bold tracking-wider" htmlFor="email">Age</label>
                  <input onChange={(e) => { setAge(e.target.value) }} className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" type="number" id="number" placeholder="" aria-label="email" required />
                </div>
                <button onClick={addFriend} className="px-4 py-1 mt-2 text-white w-full font-light font-bold tracking-wider bg-gray-900 hover:bg-gray-800 rounded mb-5"
                  type="submit">Add Friend</button>
                <div className="">
                  <p className="text-white font-medium text-center text-3xl mt-2 font-bold mb-4">Friend List</p>
                </div>
                <div className="">

                  {
                    listOfFriends.map((val, key) => {
                      return (
                        <form key={key} onSubmit={(e)=>e.preventDefault()}>
                          <div className="text-left text-white text-sm capitalize flex">

                            <div className="w-3/12 font-bold tracking-wider pt-1">{val.name}</div>
                            <div className="w-1/12 font-bold tracking-wider pt-1 mr-2">{val.age}</div>
                            <div className="w-4/12 mr-6">
                              <input onChange={(e)=>setAge(e.target.value)} className="px-2 py-1 rounded text-gray-900 font-bold" type="text" placeholder="Age.." />
                            </div>
                            <div className="w-2/12 mr-2">

                              <button onClick={()=>updateFriendAge(val._id)} className="px-4 py-1 text-white w-full text-sm font-light font-bold tracking-wider bg-red-500 hover:text-gray-800 rounded mb-3"
                                type="submit">Update</button>

                            </div>

                            <div className="w-2/12">

                              <button onClick={()=>deleteFriend(val._id)} className="px-4 py-1 text-white w-full text-sm font-light font-bold tracking-wider bg-red-500 hover:text-gray-800 rounded mb-3 font-bold"
                                type="submit">Delete</button>

                            </div>

                          </div>
                        </form>
                      )
                    })
                  }


                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
