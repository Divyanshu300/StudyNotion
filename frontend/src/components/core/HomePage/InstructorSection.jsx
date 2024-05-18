import React from 'react'

import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from './HighlightText';
import CTAButton from "./Button";
import { FaArrowRight } from 'react-icons/fa';

export default function InstructorSection() {
  return (
    <div className='mt-16'>
        <div className='flex flex-row gap-20 items-center'>
            
            <div className='w-[50%]'>
                <img
                src={Instructor}
                alt=''
                className='shadow-white'/>
            </div>

            <div className='w-[50%] flex flex-col gap-10'>
                <div className='text-4xl font-semibold'>
                    Become an 
                    <HighlightText text={"Instructor"}/>
                </div>

                <p className='font-medium yexy-[16px] w-[80%] text-richblack-300'>
                    Instructor from around the world teach millions of StudyNotion. We provide the tools and
                    skills to teach what you love.
                </p>

                <div className='w-fit'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex flex-row gap-2 items-center'>
                            Start Learning Today
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                </div>

            </div>

        </div>
    </div>
  )
}
