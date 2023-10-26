import {useEffect,useState} from "react"
import { AiOutlineDelete} from "react-icons/ai";
import {v4 as uuidv4} from 'uuid'

import './App.css';

function App() {

  const[todoList,setTodoList]=useState([])
  const[todoData,setTodo]=useState([])
  const[addedData,setData]=useState("")

  

  useEffect(()=>{
    const getApi=async()=>{
        const response=await fetch("https://jsonplaceholder.typicode.com/users/1/todos")
        const data=await response.json()
        setTodoList(data)
    }
    getApi()
  },[])
  
  useEffect(() => {
    // Process the data and set it in the 'todoData' state
    const fetchingData = todoList.map(eachItem => ({
      userId: eachItem.userId,
      id: eachItem.id,
      title: eachItem.title,
      completed: eachItem.completed,
      isEditing: false,
    }))
    setTodo(fetchingData);
  }, [todoList]);

  const completeButton = (item) => {
    const fetchingData = todoData.map((eachItem) => {
      if (eachItem.id === item) {
        return {
          ...eachItem,
          completed: !eachItem.completed,
        };
      }
      return eachItem;
    });
    setTodo(fetchingData);
  };


  const toggleEdit = (item) => {
    const fetchingData = todoData.map((eachItem) => {
      if (eachItem.id === item.id) {
        return {
          ...eachItem,
          isEditing: !eachItem.isEditing,
        };
      }
      return eachItem;
    });
    setTodo(fetchingData);
  };

  const deleteData=(item)=>{
    const fetchingData=todoData.filter(eachItem=>{
      if(eachItem.id !==item){
        return eachItem
      }
      return null
    })
    setTodo(fetchingData)
  }

  const handleEditTitle = (itemId, newTitle) => {
    const updatedTodoData = todoData.map((item) => {
      if (item.id === itemId) {
        return { ...item, title: newTitle };
      }
      return item;
    });
    setTodo(updatedTodoData);
  };


const todoRender=()=>{
 
  return(
    <div className="todoContainer">
      {todoData.map(eachItem=>
       
      <div className="finalContainer" key={eachItem.id}>
                    {eachItem.isEditing ? (
              <input
                type="text"
                value={eachItem.title}
                onChange={(e) => handleEditTitle(eachItem.id, e.target.value)}
              />
            ) : (
              <p className="title">{eachItem.title}</p>
            )}
        <div className="buttonsText">
          <button type="button" className={eachItem.completed?"buttonStyle2":"buttonStyle"} value={eachItem.id}  onClick={() => completeButton(eachItem.id)}>{eachItem.completed?"completed":"complete it"}</button>
          <button type="button" className={eachItem.isEditing?"buttonStyle2":"buttonStyle"} value={eachItem.id}  onClick={() => toggleEdit(eachItem)} >{eachItem.isEditing ? "Save" : "Edit"}</button>
          <button type="button" className="buttonStyle" value={eachItem.id} onClick={()=>deleteData(eachItem.id)}><AiOutlineDelete/></button>
          </div>
      </div>
        )
      }

      
    </div>
  )
}


const onTitle=event=>{
  setData(event.target.value)
}



const onAddTodo=()=>{
  const newTodo={
    userId:1,
    id:uuidv4(),
    title:addedData,
    completed:false,

  }
  setTodo([...todoData,newTodo])
  setData("")
}


  return (
    <div className="App">
      <h1 className="todoHeading">My Todos</h1>

      <div className="textContainer">
        
          
          <div className="suTextContainer2">
            <p className="todoHeading1">Title</p>
          <input type="text" className="textData" onChange={onTitle} value={addedData} placeholder="Title"/>
          </div>
          
     
        <button type="button" className="addButton" onClick={onAddTodo}>Add Todo</button>
      </div>
      {todoRender()}

      

    </div>

  );
}

export default App;
