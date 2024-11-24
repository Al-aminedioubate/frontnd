import { FC } from 'react';
import AppButton from './Appbutton';

interface Props{
  title?: string;
  onEditClick?(): void;
  onDeleteClick?(): void;
}
const NoteItem: FC<Props> = ({title, onEditClick, onDeleteClick }) => {

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded p-5">

    <p className="font-semibold text-gray-700 mb-4 text-lg">{title}</p>
    <div className="space-x-4">

    <AppButton onClick={() => {console.log("viewing notes");}} title="View" type="regular"></AppButton>
    <AppButton onClick = {onEditClick} title="Edit" type="normal"></AppButton>
    <AppButton onClick={onDeleteClick} title="Delete" type="danger"></AppButton>
    </div>
    </div>
  )
}

export default NoteItem;