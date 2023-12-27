import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";


const InstructionField = ({name,label,errors,register,setValue,placeholder}) => {

    const [instructionsList,setInstructionsList] = useState([]);
    const [instruction,setInstruction] = useState("");

    useEffect(() => {
        setValue(name,instructionsList);
    },[instructionsList]);

    const handleInstructionChange = (e) => {
        setInstruction(e.target.value);
    }

    const addInstructionHandler = () => {
        if(instruction && !instructionsList.includes(instruction)){
            const inst = instruction.trim();
            const newList = [...instructionsList,inst];
            setInstructionsList(newList);
            setInstruction("");
        }
    }

    const removeInstruction = (instIndex) => {
        const newList = instructionsList.filter((_,index) => index!=instIndex);
        setInstructionsList(newList);
    }

  return (
    <label className='flex flex-col justify-center items-start gap-[2px]'>
        <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>{label}<p className='text-[red]'>*</p></p>
        <input value={instruction} className='w-full bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' type='text' name={name} placeholder={placeholder} onChange={handleInstructionChange} />
        <div className='text-yellow-50 text-[16px] mt-[0.2rem] font-bold cursor-pointer' onClick={addInstructionHandler}>Add</div>
        <div className='flex flex-col justify-center items-start gap-[0.25rem]'>
            {
                instructionsList.map((inst,index) => (
                    <div className='max-w-[100%] px-[0.5rem] py-[0.25rem] flex gap-[1rem] justify-center items-center rounded-lg bg-richblack-700 text-richblack-5 text-[14px]'>
                        <div className='w-full break-words'>{inst}</div>
                        <div onClick={() => removeInstruction(index)}><RxCross2 /></div>
                    </div>
                ))
            }
        </div>
        {
            errors.whatYouWillLearn && (
                <span className='mt-1 text-[12px] text-[red]'>
                    Please Enter The {label}.
                </span>
            )
        }
    </label>
  )
}

export default InstructionField