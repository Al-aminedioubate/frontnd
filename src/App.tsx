import { useState, ChangeEventHandler } from "react";
import NoteItem from "./components/NoteItem";
import axios from 'axios';


const App = () =>{

  //const [title, setTitle] = useState("");
  //const [description, setDescription] = useState("");

  const [notes, setNotes]= useState<{
    id: string;
    title: string;
    description?: string;
  }[]>([]);

  const [values, setValues] = useState({
    title:"",
    description:"",
  })

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({target}) => {
    const {name, value} = target;
    setValues({...values, [name]: value});    ///we need to spread old values first before updated new one.
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      <form onSubmit={async (evt) =>{ 
        evt.preventDefault();

        const { data } = await axios.post("http://localhost:8000/note/create", {
          title: values.title,
          description: values.description,
        });

        setNotes([data.note,...notes]);
        setValues({title: "", description: ""});
      }} 
      
        className="space-y-6 bg-white shadow-md rounded p-5">
        <h1 className="font-semibold text-2xl text-center">Note Application</h1>
        <div>

          <input type="text" 
          className="w-full border-b-2 border-gray-700 outline-none " 
          placeholder="Title"
          onChange={handleChange}
          value={values.title}
          name="title"
          ></input>
        </div>
        <div>
          <textarea className="w-full border-b-2 border-gray-700 outline-none resize-none h-36" placeholder="description"
          onChange={handleChange}
          value={values.description}
          name="description"
          ></textarea>
        </div>
        <div className="text-right">
          <button onClick={() =>{
            console.log(values);
          }} className="bg-blue-500 text-white px-5 py-2 rounded">Submit</button>
        </div>
      </form>
      
      {/*Note items*/}
      {notes.map((note) =>{
        return <NoteItem key={note.title} title={note.title} />
      })}
    </div>
  );
}

export default App;