import React, { useEffect, useState } from 'react'
import { updateSection,deleteSection,createSubSection,deleteSubSection, updateSubSection } from '../../../services/operations/courseDetailsAPI'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '../../../reducer/slices/courseSlice';
import { LuLayoutList } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import LogOutModal from '../LogOutModal';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import { useForm } from 'react-hook-form';
import './nestedView.css';
import EditLectureModal from './EditLectureModal';

const NestedView = () => {

    const {token} = useSelector((state) => state.auth);
    const {course} = useSelector((state) => state.course);
    const [deleteModalData,setDeleteModalData] = useState(null);
    const [editModalData,setEditModalData] = useState(null);
	  const [editSubSectionModal,setEditSubSectionModal] = useState(null);

    const dispatch = useDispatch();

    const {getValues,register,setValue,formState : {errors}} = useForm();

    // console.log("Course :",course);

    const deleteSectionHandler = async(sectionId) => {
      await dispatch(deleteSection({sectionId:sectionId,courseId:course._id},token));
      setDeleteModalData(null);
    }

    const updateSectionHandler = async(sectionId) => {
      const value = getValues();
      const sectionName = value.sectionName;

      await dispatch(updateSection({sectionName:sectionName,sectionId:sectionId,courseId:course._id},token));
      setEditModalData(null);
    }

    const saveEditSubSectionHandler = async(sectionId) => {
      const value = getValues();
      const formData = new FormData();
      formData.append("sectionId",sectionId);
      formData.append("title",value.lectureName);
      formData.append("description",value.lectureDescription);
      formData.append("video",value.lecture);
      const updatedSection = await dispatch(createSubSection(formData,token));

      if(updatedSection){
        const updatedCourseContent = course.courseContent.map((section) =>
          section._id === sectionId ? updatedSection : section
        )
        const updatedCourse = {...course,courseContent:updatedCourseContent};
        await dispatch(setCourse(updatedCourse));
      }

      setValue('lectureName','');
      setValue('lectureDescription','');
      setValue('video','');
      setEditSubSectionModal(null);
    }

    const deleteSubSectionHandler = async(sectionId,subSectionId) => {
      const updatedSection = await dispatch(deleteSubSection({sectionId,subSectionId},token));
      if(updatedSection){
        const updatedCourseContent = course.courseContent.map((section) =>
          section._id === sectionId ? updatedSection : section
        )
        const updatedCourse = {...course,courseContent:updatedCourseContent};
        console.log("Updated Course : ",updatedCourse);
        await dispatch(setCourse(updatedCourse));
      }
    }

  return (
    <>
      {
        course.courseContent.length > 0 ? (
          <div className='w-full bg-richblack-700 rounded-lg mx-auto flex flex-col justify-start items-center px-[1rem] py-[0.5rem]'>
          {
            course?.courseContent.map((section,index) => (
              <details key={index} className='w-full flex flex-col justify-center items-start'>
                <summary className='w-full flex justify-between items-center transition-all duration-200'>
                  <div className='flex gap-[1rem] items-center justify-center'>
                    <LuLayoutList className='text-richblack-400 font-bold text-[1.5rem]' />
                    <p className='text-richblack-50 text-[1.25rem] font-medium'>{section?.sectionName}</p>
                  </div>
                  <div className='flex gap-[0.5rem] justify-center text-richblack-400 items-center text-[1.5rem]'>
                    <MdEdit onClick={() => setEditModalData({
                          heading : "Section Name",
                          placeholder : "Enter new Section Name",
                          b1txt : "Update",
                          b2txt : "Cancel",
                          b1Handler : () => updateSectionHandler(section._id),
                          b2Handler : () => setEditModalData(null),
                    })} />
                    <MdOutlineDelete onClick={() => setDeleteModalData({
                          heading : "Are you Sure?",
                          subHeading : "This Section would be deleted!",
                          b1txt : "Delete",
                          b2txt : "Cancel",
                          b1Handler : () => deleteSectionHandler(section._id),
                          b2Handler : () => setDeleteModalData(null),
                    })
                    } />
                    {/* <div className='w-[2px] h-[1.25rem] bg-richblack-100'></div>
                    {
                      section.isOpen ? (<FaCaretUp />) : (<FaCaretDown />)
                    } */}
                  </div>
                </summary>
                {
                  section.subSection.map((subSection,index) => (
                    <div key={index} className='w-full border-t-[2px] py-[0.5rem] border-richblack-600 flex justify-between items-center pl-[1.5rem]'>
              <div className='flex justify-center items-center gap-[1rem]'>
                <LuLayoutList className='text-richblack-400 font-bold text-[1.25rem]' />
                <p className='text-richblack-50 text-[1rem] font-medium'>{subSection?.title}</p>
              </div>
              <div className='flex gap-[0.5rem] justify-center text-richblack-400 items-center text-[1.25rem]' >
                <MdEdit />
                <MdOutlineDelete className='cursor-pointer' onClick={() => deleteSubSectionHandler(section._id,subSection._id)} />
              </div>
                    </div>
            ))
                }
          <div className='flex pl-[1.5rem] gap-[1rem] text-[1rem] border-t-[2px] py-[0.5rem] border-richblack-600 font-semibold font-edu-sa text-yellow-50 justify-start items-center cursor-pointer' onClick={() => setEditSubSectionModal({
            editMode : false,
            b1Handler : () => saveEditSubSectionHandler(section._id),
            b2Handler : () => setEditSubSectionModal(null),
          })}>
            <FaPlus />
            <div>Add Lecture</div>
          </div>
              </details>
            ))
          }

          {
            deleteModalData && <DeleteModal data={deleteModalData} />
          }
          {
            editModalData && <EditModal data={editModalData} register={register} />
          }
          {
            editSubSectionModal && <EditLectureModal data={editSubSectionModal} setValue={setValue} register={register} errors={errors} setEditSubSectionModal={setEditSubSectionModal}  />
          }
        </div>
        ) : (<></>)
      }
    </>
  )
}

export default NestedView