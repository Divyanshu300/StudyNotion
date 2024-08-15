import React, { useState } from 'react';
import Footer from "../components/common/Footer"
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import { categoriesEndpoints } from '../services/apis';
import { getCatelogPageData } from '../services/operations/pageAndComponentData';

const Catalog = () => {

    const {catalogName} = useParams();
    const [catalogPageData , setCatalogPageData] = useState(null);
    const [categoryId , setCategoryId] = useState("");
    
    //Fetch all categories
    useEffect(() => {
        const getCategories = async() => {
            const res = await apiConnector("GET" , categoriesEndpoints.SHOW_ALL_CATEGORIES_API);
            const category_id = res.data.allCategory?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }

        getCategories()
    } , [catalogName])
    
    
    useEffect(() => {
        const getCategoryDetails = async() => {
            try {
                const res = await getCatelogPageData(categoryId);
                setCatalogPageData(res);
            }
            catch(error){
                console.log(error)
            }
        }

        getCategoryDetails()
    } , [categoryId])

  return (
    <div>
        
        <div>
            <p>
                
            </p>
            <p>

            </p>
            <p>

            </p>
        </div>

        <div>
            {/* SECTION 1 */}
            <div>
                <div className='flex gap-x-3'>
                    <p>
                        Most Popular
                    </p>
                    <p>
                        New
                    </p>
                </div>
                <CourseSlider/>
            </div>

            {/* SECTION 2 */}
            <div>
                <p>
                    Top Course
                </p>
                <div>
                    <CourseSlider/>
                </div>
            </div>

            {/* SECTION 3 */}
            <div>
                <p>
                    Frequently Bought Together
                </p>
            </div>
        </div>
    
    <Footer/>
    
    </div>
  )
}

export default Catalog