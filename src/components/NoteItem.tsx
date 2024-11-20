import {FC, } from 'react';
import AppButton from './Appbutton';

const NoteItem: FC< {title: string}> =(props) => {

    return <div className="max-w-3xl mx-auto bg-white shadow-md rounded p-5">
    <p className="font-semibold text-gray-700 mb-4 text-lg">{props.title}</p>
    <div className="space-x-4">

     <AppButton title="View" type="regular"></AppButton>
     <AppButton title="Edit" type="normal"></AppButton>
     <AppButton title="Delete" type="danger"></AppButton>
    </div>
  </div>
}

export default NoteItem;