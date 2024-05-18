import React , {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

export const ChipInput = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) => {

  const {editCourse , course} = useSelector((state) => state.course);

  //setting up state for managing chips array
  const [chips , setChips] = useState([]);

  useEffect(() => {
    if(editCourse) {
      setChips(course?.tag)
    }
    register(name,{
      required : true,
      validate : (value) => value.length > 0
    })
  } , [])

  useEffect(() => {
    setValue(name , chips)
  } , [chips])

  //Function to handle user input when chips are added
  const handleKeyDown = (event) => {
    
  }


  return (
    <div>
      
    </div>
  )
}
