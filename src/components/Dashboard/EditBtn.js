import React from 'react'
import {GrEdit} from 'react-icons/gr'
import Button from '../HomePage/Button'
import { useNavigate } from 'react-router-dom'

const EditBtn = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/dashboard/settings")}>
        <Button active={true}>
            <div className='flex gap-[1rem] items-center justify-center'>
                <GrEdit />
                <p>Edit</p>
            </div>
        </Button>
    </div>
  )
}

export default EditBtn