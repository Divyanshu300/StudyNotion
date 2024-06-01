import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import {GrAddCircle} from "react-icons/gr";
import {useDispatch, useSelector} from "react-redux";
import {BiRightArrow} from "react-icons/bi";
import toast from 'react-hot-toast';

import IconBtn from "../../../../common/IconBtn";
import { createSection } from '../../../../../services/operations/courseDetailsAPI';
import { NestedView } from './NestedView';
import { updateSection } from '../../../../../services/operations/courseDetailsAPI';
import { setEditCourse } from '../../../../../slices/courseSlice';
import { setStep } from '../../../../../slices/courseSlice';
import { setCourse } from '../../../../../slices/courseSlice';

export const CourseBuilderForm = () => {

  const { register , handleSubmit , setValue , formState : {errors} } = useForm();
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const [editSectionName , setEditSectionName] = useState(false);
  const dispatch = useDispatch();
  const [loading , setLoading] = useState(false);

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName" , "");
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }
  const goToNext = () => {
    
    console.log("YE LO BHAI COURSE--->",course)
    if(course.courseContent.length === 0) {
      toast.error("Plaese add atleast one section");
      return;
    }

    if(course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }

    //if everything is good
    dispatch(setStep(3));
  }

  const onSubmit = async(data) => {
    setLoading(true);
    let result;

    if(editSectionName) {
      //we are editing the section name
      result = await updateSection({
        sectionName : data.sectionName,
        sectionId : editSectionName,
        courseId : course._id,
      },token)
    }
    else {
      result = await createSection({
        sectionName : data.sectionName,
        courseId : course._id,
      } , token)
    }

    console.log("RESULT OF SUBMIT--->" , result);
    
    //update values
    if(result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName" , "");
    }
    console.log("COURSE after SUBMIT--->" , course );

    //setLoading False
    setLoading(false);
  }


  const handleChangeEditSectionName = (sectionId , sectionName) => {
    if(editSectionName === sectionId) {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName" , sectionName);
  }

  return (
    <div className='text-white'>
      <p>
        Course Builder
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='sectionName'>
            Section name <sup>*</sup>
          </label>
          <input
            id='sectionName'
            placeholder='Add section name'
            {...register("sectionName" , {required : true})}
            className='w-full form-Style'
          /> 
          {
            errors.sectionName && (
              <span>
                Section Name is required
              </span>
            )
          }
        </div>
        <div className = "mt-10 flex">
          <IconBtn
            type = "Submit"
            text = {editSectionName ? "Edit Section Name" : "Create Section"}
            outline = {true} 
          > 
            <GrAddCircle className='text-yellow-50'/>
          </IconBtn>
          {
            editSectionName && (
              <button
                type='button'
                onClick={cancelEdit}
                className='text-sm text-richblack-300 underline'
              >
                Cancel Edit
              </button>
            )
          }
        </div>
      </form>
      {
        course.courseContent?.length > 0 && (
          <NestedView handleChangeEditSectionName = {handleChangeEditSectionName}/>
        )
      }

      <div className='flex justify-end gap-x-3 mt-10'>
        <button
        onClick={goBack}
        className='rounded-md cursor-pointer flex items-center'>
            Back
        </button>

        <IconBtn
          text = "Next"
          onClick = {goToNext}
        >
          <BiRightArrow/>
        </IconBtn>
      </div>
    </div>
  )
}
