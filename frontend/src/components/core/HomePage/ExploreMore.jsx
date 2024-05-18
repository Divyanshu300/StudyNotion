import React, { useState } from 'react';

import {HomePageExplore} from "../../../data/homepage-explore";
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free" , 
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

export default function ExploreMore() {
  
    const [currentTab , setCurrentTab] = useState(tabsName[0]);
    const [courses , setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((courses) => courses.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
  
    return (
    <div>

        <div className='text-4xl font-semibold text-center'>
            Unlock the 
            <HighlightText text={"Power of Code"}/>
        </div>

        <p className='text-center text-richblack-300 text-sm text-[16px] mt-3'>
            Learn to build anything you can imagine
        </p>

        <div className='flex flex-row rounded-full bg-richblack-800 mb-5 mt-5 border-richblack-100 px-1 py-1'>
            {
                tabsName.map((tab , index) => {
                    return(
                        <div 
                        className={`text-[16px] items-center gap-2
                        ${currentTab === tab //jo current tab hai and tabsname mein jo naam hai agar woh match krega 
                            ? "bg-richblack-900 text-richblack-5 font-medium" //toh usprr ye property lgaa do
                            : "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer
                            hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}//jo match nhi krta uprr backet waali prop lgaa do 
                        key={index}
                        onClick={() => setMyCards(tab)}
                        >
                            {tab}
                        </div>
                    );
                })
            }
        </div>

        <div className='lg:h-[150px]'></div>

        {/* Course Card ka group */}

        <div className='lg:absolute flex flex-wrap gap-10 lg:gap-0 justify-center lg:justify-between w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3'>
            {
                courses.map((element , index) => {
                    return(
                        <CourseCard
                        key={index}
                        cardData={element}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                        />
                    );
                })
            }
        </div>

    </div>
  )
}
