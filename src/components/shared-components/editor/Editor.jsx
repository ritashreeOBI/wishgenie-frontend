import React from 'react'
import { BsArrowsMove, BsPlusSquareDotted, BsThreeDotsVertical, BsZoomIn } from 'react-icons/bs'
import Image from 'next/image'
import { MdFileUpload, MdOutlineDashboard, MdOutlineLockOpen, MdOutlineRedo, MdStar, MdUndo } from 'react-icons/md'
import { RxText, RxTransform } from "react-icons/rx";
import { FiCheckSquare } from 'react-icons/fi'
import { TbEdit } from 'react-icons/tb'
import { AiOutlineFontSize } from 'react-icons/ai'
import { IoExpandSharp } from "react-icons/io5";


const editOptions = [
    {
        title: "Text",
        icons: <TbEdit />
    },
    {
        title: "Color",
        icons: <BsArrowsMove />
    },
    {
        title: "Font",
        icons: <AiOutlineFontSize />
    },
    {
        title: "Transform",
        icons: <RxTransform />
    },
    {
        title: "Position",
        icons: <BsArrowsMove />
    },
    {
        title: "Arc",
        icons: <BsArrowsMove />
    },

    {
        title: "Outline",
        icons: <TbEdit />
    },
    {
        title: "Shadow",
        icons: <AiOutlineFontSize />
    },



]

const redo = [
    {
        name: "Undo",
        icon: <MdUndo />
    },
    {
        name: 'Redo',
        icon: <MdOutlineRedo />
    }
]

function Editor({ path }) {
    return (

        <div className='editor w-full h-full bg-white rounded-xl drop'>
            <div className='flex justify-center p-2 text-sm'>
                <div className='p-2 rounded-full bg-sky-100'> Front</div>
                <div className='p-2 '> Back</div>
                <div className='p-2 '> Inside label</div>
            </div>
            <div className='p-2 px-8 flex gap-2  '>
                <div className='editOption-lg flex gap-4 overflow-x-scroll max-w-[450px]  '>
                    {
                        editOptions.map((items, idx) => {
                            return (
                                <div className='gap-2 flex items-center' key={idx}>
                                    {items.icons}
                                    <p className='text-xs'>{items.title}</p>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='flex gap-4 px-4 border-x'>
                    {
                        redo.map((items) => items.icon)
                    }
                </div>

                <p className='text-xs'>Layers</p>
            </div>
            <div className='editDetail grid grid-cols-4'>
                <div className='flex flex-col gap-2  items-center col-span-3 pl-4  '>
                    <div className=' w-full shadow-md   flex justify-center rounded-lg relative'>
                        <Image src={path || "/products/p-19.webp"} width={300} height={300} />

                        <div className='absolute right-2 p-2 text-xl   border rounded-md flex flex-col gap-4'>
                            <MdOutlineDashboard />
                            <IoExpandSharp />
                            <BsPlusSquareDotted />
                            <BsZoomIn />
                        </div>
                    </div>
                    <div className='editOption-sm hidden flex gap-4 overflow-y-scroll w-full'>
                        {
                            editOptions.map((items, idx) => {
                                return (
                                    <div className='gap-2 flex items-center p-2 bg-slate-100' key={idx}>
                                        {items.icons}
                                        <p className='text-xs'>{items.title}</p>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className='option flex gap-2 p-2 '>
                        <div className=" optionBox  grow flex  flex-col gap-4 bg-white drop p-4 items-center rounded-md">
                            <MdFileUpload size={30} className='opacity-40' />
                            Choose file
                        </div>
                        <div className=" optionBox grow  flex flex-col  gap-4 bg-white drop p-4 items-center rounded-md">
                            <RxText size={30} className='opacity-40' />
                            Add text
                        </div>
                        <div className=" optionBox  grow flex flex-col  gap-4 bg-white drop p-4 items-center rounded-md">
                            <FiCheckSquare size={30} className='opacity-40' />
                            Add to cart
                        </div>
                    </div>
                </div>
                <div className='col-span-1 p-2  editings'>
                    <div className=' border-2 edits border-blue-500 w-full p-2 rounded-md bg-slate-100'>
                        <div className='flex justify-end  gap-2  '>
                            <MdOutlineLockOpen />
                            <BsThreeDotsVertical />

                        </div>
                        <div className='grid grid-cols-2'>
                            <div>

                            </div>
                            <div className='text-xs flex flex-col gap-2'>
                                <p className='bg-slate-400 w-fit p-2 rounded-full   text-white'>Text</p>
                                <p>#23</p>
                                <strong>Print Quality</strong>
                                <p className='text-green-600 text-[10px]'>Good / Vector</p>
                                <p><strong>Width</strong>: 3.96</p>
                                <p><strong>Height</strong>: 1.64</p>
                            </div>
                        </div>

                    </div>
                    <div className=' border-2 edits border-blue-500 w-full p-2 rounded-md bg-slate-100'>
                        <div className='flex justify-end  gap-2  '>
                            <MdOutlineLockOpen />
                            <BsThreeDotsVertical />

                        </div>
                        <div className='grid grid-cols-2'>
                            <div>

                            </div>
                            <div className=' text-xs flex flex-col gap-2'>
                                <p className='bg-slate-400 w-fit p-2 rounded-full   text-white'>Text</p>
                                <p>#23</p>
                                <strong>Print Quality</strong>
                                <p className='text-green-600 text-[10px]'>Good / Vector</p>
                                <p><strong>Width</strong>: 3.96</p>
                                <p><strong>Height</strong>: 1.64</p>
                            </div>
                        </div>

                    </div>
                   
                </div>
            </div>
        </div>


    )
}

export default Editor