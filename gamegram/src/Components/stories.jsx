import React from 'react'
import { ArrowSmallLeftIcon,ArrowSmallRightIcon } from '@heroicons/react/24/outline'

const Stories = () => {
    const slideLeft=()=>{
        let slider = document.getElementById('slider')
        slider.scrollLeft= slider.scrollLeft - 500

    }
    const slideRight=()=>{
        let slider = document.getElementById('slider')
        slider.scrollLeft= slider.scrollLeft + 500

    }
  return (
    <div className='storiesCardWrapper py-5 mt-5 relative flex items-center bg-contrast rounded-xl px-2'>
        <ArrowSmallLeftIcon className='h-5 text-white hover:text-main ' onClick={slideLeft}/>
       <div id="slider" className='w-full h-full overflow-x-scroll whitespace-nowrap scroll scroll-smooth scrollbar-hide'>
            <div className='bg-main w-[6rem] h-[6rem] rounded-full inline-block  mx-5 px-2 py-2'>
            <div className='bg-secondary w-[5rem] h-[5rem] rounded-full '></div>
            </div>
            <div className='bg-main w-[6rem] h-[6rem] rounded-full inline-block  mx-5 px-2 py-2'>
            <div className='bg-secondary w-[5rem] h-[5rem] rounded-full '></div>
            </div>
            <div className='bg-main w-[6rem] h-[6rem] rounded-full inline-block  mx-5 px-2 py-2'>
            <div className='bg-secondary w-[5rem] h-[5rem] rounded-full '></div>
            </div>
            <div className='bg-main w-[6rem] h-[6rem] rounded-full inline-block  mx-5 px-2 py-2'>
            <div className='bg-secondary w-[5rem] h-[5rem] rounded-full '></div>
            </div>
            <div className='bg-main w-[6rem] h-[6rem] rounded-full inline-block  mx-5 px-2 py-2'>
            <div className='bg-secondary w-[5rem] h-[5rem] rounded-full '></div>
            </div>
            <div className='bg-main w-[6rem] h-[6rem] rounded-full inline-block  mx-5 px-2 py-2'>
            <div className='bg-secondary w-[5rem] h-[5rem] rounded-full '></div>
            </div>
            <div className='bg-main w-[6rem] h-[6rem] rounded-full inline-block  mx-5 px-2 py-2'>
            <div className='bg-secondary w-[5rem] h-[5rem] rounded-full '></div>
            </div>
            <div className='bg-main w-[6rem] h-[6rem] rounded-full inline-block  mx-5 px-2 py-2'>
            <div className='bg-secondary w-[5rem] h-[5rem] rounded-full '></div>
            </div>
            <div className='bg-main w-[6rem] h-[6rem] rounded-full inline-block  mx-5 px-2 py-2'>
            <div className='bg-secondary w-[5rem] h-[5rem] rounded-full '></div>
            </div>
            <div className='bg-main w-[6rem] h-[6rem] rounded-full inline-block  mx-5 px-2 py-2'>
            <div className='bg-secondary w-[5rem] h-[5rem] rounded-full '></div>
            </div>
            <div className='bg-main w-[6rem] h-[6rem] rounded-full inline-block  mx-5 px-2 py-2'>
            <div className='bg-secondary w-[5rem] h-[5rem] rounded-full '></div>
            </div>
            <div className='bg-main w-[6rem] h-[6rem] rounded-full inline-block  mx-5 px-2 py-2'>
            <div className='bg-secondary w-[5rem] h-[5rem] rounded-full '></div>
            </div>
            <div className='bg-main w-[6rem] h-[6rem] rounded-full inline-block  mx-5 px-2 py-2'>
            <div className='bg-secondary w-[5rem] h-[5rem] rounded-full '></div>
            </div>
       </div>
<ArrowSmallRightIcon className='h-5 text-white hover:text-main' onClick={slideRight}/>
    </div>
  )
}

export default Stories