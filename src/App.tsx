import { useState, ChangeEventHandler, useEffect } from "react";
import NoteItem from "./components/NoteItem";
import axios from 'axios';

const App = () =>{

  //const [title, setTitle] = useState("");
  //const [description, setDescription] = useState("");
  //const [count, setCount] = useState(0);

  const [notes, setNotes]= useState<{
    id: string;
    title: string;
    description?: string;
  }[]>([]);

  const [values, setValues] = useState({
    title: "",
    description: "",
  });
  const [selectedNoteId, setSelectedNoteId] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({target}) => {
    const {name, value} = target;
    setValues({...values, [name]: value});    ///we need to spread old values first before updated new one.
  };

  useEffect(() =>{
    /*Methode pour recuperer toutes les notes dans notre backend et leur afficher sur le frontend*/
    //we can call here our API and fetch notes
    const fetchNotes = async () => {
      const {data} = await axios("http://localhost:8000/note");
      setNotes(data.notes);
    }

    fetchNotes();
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/*Methode pour creer une note dans notre backend a partir de frontend*/}
      <form onSubmit={async (evt) =>{ 
        evt.preventDefault();

        //verifions d'abord qu'il ya une note selectionner avant de modifier
        if(selectedNoteId){
            const { data } = await axios.patch("http://localhost:8000/note/" + selectedNoteId,
            {
              title: values.title,
              description: values.description,
            }
          );

          const updatedNotes = notes.map((note) => {
            if(note.id === selectedNoteId){
              note.title = data.note.title;
              note.description = data.note.description;
            }
            return note;
          })

          setNotes([...updatedNotes]);
          setValues({title: '', description: ''});    //permet de vider le contenu du formulaire. 
          return;                                       //on fait un return ici pour terminer l'action.
        }

        const { data } = await axios.post("http://localhost:8000/note/create", {
          title: values.title,
          description: values.description,
        });

        setNotes([data.note,...notes]);
        setValues({title: "", description: ""});
      }} 
      className="space-y-6 bg-white shadow-md rounded p-5">
        {/**
        <div>
          <span>{count}</span>
          <button type="button" onClick={() => setCount(count + 1)}> Click Me</button>
        </div> */}
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
        return <NoteItem onEditClick={() => {
          setSelectedNoteId(note.id);
          setValues({title: note.title, description: note.description || ''});
        }} key={note.id} title={note.title} />
      })}
    </div>
  );
}

export default App;