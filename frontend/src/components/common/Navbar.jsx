import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links";
import { useSelector } from 'react-redux';
import {AiOutlineMenu, AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiconnector.js';
import { categoriesEndpoints } from '../../services/apis';
import {IoIosArrowDropdownCircle} from "react-icons/io"

function Navbar() {

  const {token} = useSelector( (state) => state.auth ); 
  const {user} = useSelector( (state) => state.profile );
  const {totalItems} = useSelector( (state) => state.cart );
  const [loading, setLoading] = useState(false)

  const location = useLocation()
  
  const matchRoute = (route) => {
    return matchPath({path:route} , location.pathname);
  }

  const [subLinks , setSubLinks] = useState([]);

  const fetchSubLinks = async() => {
    try {
        const result = await apiConnector("GET" , categoriesEndpoints.SHOW_ALL_CATEGORIES_API);
        console.log("Printing Sublinks Result : " , result);
        setSubLinks(result.data.allCategories);
    }
    catch(error) {
        console.log("could not fetch the category list");
    } 
  }


  useEffect( () => {
    fetchSubLinks()
  } , [])

  return (
    <div 
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
      location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            {/* Image */}
            <Link to="/">
              <img src={logo} width={160} height={42} loading='lazy'/>
            </Link>

            {/* Navbar Links */}
            <nav className="hidden md:block">
              <ul className='flex gap-x-6 text-richblack-25'>
                {
                  NavbarLinks.map((link , index) => (
                    <li key={index}>
                      {
                        link.title === "Catalog" ? 
                        (
                          <div 
                            className={`group relative flex cursor-pointer items-center gap-1 ${
                              matchRoute("/catalog/:catalogName")
                                ? "text-yellow-25"
                                : "text-richblack-25"
                            }`}
                          >
                            <p>{link.title}</p>
                            <IoIosArrowDropdownCircle/>

                            <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] 
                            translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 
                            text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible 
                            group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"
                            >
                              <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] 
                              translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"
                              >
                              </div>  
                              {
                                loading ? (
                                  <p className='spinner'></p>
                                ) : subLinks?.length ? (
                                  <>
                                    {
                                      subLinks?.filter(
                                        (sublink) => sublink?.courses?.length > 0 
                                      )?.map((sublink , i) => (
                                        <Link
                                          to={`/catalog/${sublink.name.split(" ").join("-").toLowerCase()}`}
                                          className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'
                                          key={i}
                                        >
                                          <p>{sublink.name}</p>
                                        </Link>
                                      ))
                                    }
                                  </>
                                ) : (
                                  <p className='text-center'>No Courses Found</p>
                                )
                              }
                            </div>
                          </div>
                        ) : 
                        (
                          <Link to={link?.path}>
                            <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                              {link.title}
                            </p>
                          </Link>
                        )
                      }
                    </li>
                  ))
                }
              </ul>
            </nav>

            {/* Login/SignUp/Dashboard */}
            <div className='hidden  gap-x-4 items-center md:flex'>

              {
                user && user?.accountType !== "Instructor" && (
                  <Link to="/dashboard/cart" className='relative'>
                    <AiOutlineShoppingCart/>
                    {
                      totalItems > 0 && (
                        <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                          {totalItems}
                        </span>
                      )
                    }
                  </Link>
                )
              }

              {
                token === null && (
                  <Link to="/login">
                    <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                    text-richblack-100 rounded-md'>
                      Log In
                    </button>
                  </Link>
                )
              }

              {
                token === null && (
                  <Link to="/signup">
                    <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                    text-richblack-100 rounded-md'>
                      Sign Up
                    </button>
                  </Link>
                )
              }

              {
                token !== null && <ProfileDropDown/>
              }

            </div>
            <button className="mr-4 md:hidden">
              <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
            </button>
        </div>
    </div>
  )
}

export default Navbar