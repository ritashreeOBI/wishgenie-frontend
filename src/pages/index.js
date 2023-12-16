import { Inter } from 'next/font/google'
import 'aos/dist/aos.css';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {




  return (

    <div>
      
    </div>

   /*  <div >
      
         {  componentName === ""?   <Image src={BannerImage} priority alt="background-image"/>  :"" }
       

     
        <div className='chat-box  bg-white  rounded-2xl shadow-md overflow-hidden flex flex-col bg-white items-left left-14 absolute w-[40%]  top-24 z-20' data-aos="zoom-out-down">
          <div className={`${ componentName!= "CustomManufacturer"? 'w-[100%] ':'w-[65%] h-[600px] full mt-10'} h-[450px] `}>
            <ChatWindow />
          </div>
          {
          componentName === "OnlineProduct" || componentName === ""
          ?
          <div className=" upload flex  p-4  items-center justify-center gap-6 w-[100%] cursor-pointer"
            style={{
              backgroundImage: 'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)'
            }}>
            <Image src="/upl.png" width={64} height={64} alt="image-upload" />
            <p className='upload-title text-sm  font-bold w-[70%]'>
              Upload an image and Wish Genie will help find what you are looking for.
            </p>
          </div>
          :""
     }
      </div>
     

      <div data-aos="fade-up" className={`flex flex-col absolute test mb-20  bg-[url(/bg-test.jpg)]  bg-no-repeat bg-cover    px-2 w-full ease-in-out duration-2000 transition-all ${component ?'top-0 translate-0 ':' translate-y-[1400px]'}`}>
        {
          component ?
            <div className=''>
              <div>
                {component}
              </div>
              <Footer/>
            </div> : ""
      
        }
         

      </div>

     

    </div> */



  )
}
