import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { setEditCourse,setCourse } from '../../reducer/slices/courseSlice';
import RenderSteps from './AddCourse/RenderSteps';
import { getFullDetailsOfCourse } from '../../services/operations/courseDetailsAPI';

const EditCourse = () => {
    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
        ;(async () => {
          const result = await getFullDetailsOfCourse(courseId, token)
          if (result?.courseDetails) {
            dispatch(setEditCourse(true))
            dispatch(setCourse(result?.courseDetails))
          }
        })()
    }, []);

  return (
    <div>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Course</h1>
        <div className='lg:w-[60%] md:w-[75%] w-[95%] mx-auto'>
            {
                course ? (<RenderSteps />) : (<p className="mt-14 text-center text-3xl font-semibold text-richblack-100">Course Not Found!</p>)
            }
        </div>
    </div>
  )
}

export default EditCourse