import React from 'react'
import HighlightText from './HighlightText'
import Button from './Button'
import {BsArrowRightShort} from 'react-icons/bs';
import { TypeAnimation } from 'react-type-animation';

const Segment = ({position,heading,subheading,b1,b2,codeblock,blurcolor}) => {

  return (
    <div className={`flex ${position} w-full justify-center lg:my-[0px] my-[2rem] lg:gap-[8rem] gap-[2rem]`}>
        <div className='lg:w-[55%] w-full flex justify-center items-center mx-auto lg:text-left text-center flex-col gap-[4px] lg:gap-[1rem]'>
            <p className='text-white text-left font-bold text-[36px] leading-[1.2] tracking-tight'>{heading}</p>
            <p className='text-richblack-300 text-left text-[16px] leading-[1.5]'>{subheading}</p>
            <div className='flex gap-[1rem] sm:flex-row flex-col mt-[40px]'>
                <Button linkedTo={b1.linkedTo} active={b1.active} >{b1.text}<BsArrowRightShort /></Button>
                <Button linkedTo={b2.linkedTo} active={b2.active} >{b2.text}</Button>
            </div>
        </div>

        <div className='flex lg:w-[50%] h-auto md:w-3/5 w-full mx-auto py-[8px] font-mono text-[10px] lg:text-[14px] bg-gradient-to-br from-[#0f0f0f] to-[#1a1818] rounded-md cursor-none border-t-[2px] border-l-[2px] border-richblack-700'>
            <div className='flex flex-col text-center lg:leading-[1.5] leading-[1.45] w-[10%] text-richblack-400 gap-[2px]'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
            </div>
            <div className='flex flex-col w-[90%]'>
            <TypeAnimation
                sequence={[codeblock, 1000, ""]}
                cursor={true}
                repeat={Infinity}
                style={{
                whiteSpace: "pre-line",
                display: "block",
                flexDirection: "column",
                lineHeight: "1.63",
                fontWeight:600
                }}
                omitDeletionAnimation={true}
            />
            </div>
            <div className={`absolute z-[10] w-[250px] h-[150px] rounded-full blur-[170px]`} style={{ backgroundColor: blurcolor }}></div>
        </div>
        
    </div>
  )
}

export default Segment