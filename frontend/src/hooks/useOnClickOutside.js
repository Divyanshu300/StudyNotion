import React, { useEffect } from 'react'

//This hook detects clicks outside of the specified component and calls the provided handler function.
function useOnClickOutside(ref , handler) {
  useEffect( ()=> {
    //Define the listener function to be called on click/touch events
    const listener = (event) => {
      //If the click/touch event originated inside the ref element , do nothing
      if(!ref.current || ref.current.contains(event.target)) {
        return;
      }
      //If click/touch is done outside the ref element, call the provided handler fumction
      handler(event);
    };

    //Add event listeners fro mousedown and touchstart events on the document
    document.addEventListener("mousedown" , listener);
    document.addEventListener("touchstart" , listener);

    //cleanup function to remove the event listeners when the component unmounts or when the ref/handler dependencies change
    return() => {
      document.addEventListener("mousedown" , listener);
      document.addEventListener("touchstart" , listener);  
    };

  } , [ref , handler])//Only run this effect when the ref or handler function changes
}

export default useOnClickOutside