<<<<<<< Updated upstream
import React, { Children } from 'react'
=======

import Image from 'next/image'
import { useRouter } from 'next/router';
import React from 'react'
import { BsStars } from "react-icons/bs";
import { MdKeyboardArrowRight, MdStar } from 'react-icons/md';
import { useDispatch } from 'react-redux';

function Card({ pro }) {

    console.log("🚀 ~ file: Card.jsx:10 ~ Card ~ pro:", pro)

    const dispatch = useDispatch()

    const router = useRouter()

    const ViewHandler = (link, customize, productID) => {
        if (!customize) {
            window.open(link)
        } else {
            router.push(`/products/${productID}`)
        }
    }

    const colVariant = pro?.options[0]?.values

>>>>>>> Stashed changes


function Card({ path, children }) {
    return (
        <div className="image">
            <img className="image__img" src={path} alt="Bricks" />
            <div className="image__overlay image__overlay--primary">
                <div className='flex flex-col img_des '>
                    
                   {children}
                </div>
            </div>
        </div>
    )
}

export default Card