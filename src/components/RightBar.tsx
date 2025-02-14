import ThreeDots from '../logos/ThreeDot.svg'
import Calendar from '../logos/Calendar.svg'
import Folder from '../logos/Folderlogo.svg'
import Favorite from '../logos/Favorites.svg'
import Archive from '../logos/Archived.svg'
import Delete from '../logos/Trash.svg'
import axios from 'axios'
import { useState,useEffect } from 'react'


function RightBar(){

    const[data,setdata]=useState(null);
    const [error, setError] = useState(null);

    const[isVisible,setIsVisble]=useState(false);

    const handleToggle=()=>{setIsVisble(!isVisible)}

    // API CALL

    useEffect(() => {
        axios.get('api/notes/4b3b5782-5721-4ca7-aed1-a6ef8242fb7f')
          .then(response => {
            setdata(response.data);
            console.log(response.data);   
    
          })
          .catch(error => {
            setError(error);
          });
      }, []);

    // const Notes = [ 
    //     {
    //         title: 'Reflection on the Month Of June',
    //         date: '12/12/2024',
    //         foldername: 'Personal',
    //         content: `It's hard to believe that June is already over! Looking back on the month, there were a few highlights that stand out to me.
        
    //         One of the best things that happened was getting promoted at work. I've been working really hard and it's great to see that effort recognized. It's also exciting to have more responsibility and the opportunity to contribute to the company in a bigger way. I'm looking forward to taking on new challenges and learning as much as I can in my new role.
        
    //         I also had a great time on my vacation to Hawaii. The beaches were beautiful and I loved trying all of the different types of Hawaiian food. It was nice to relax and get away from the daily grind for a bit. I'm so grateful to have had the opportunity to take a trip like that.
        
    //         On the downside, I feel like I didn't make as much progress on my fitness goals as I would have liked. I was really busy with work and didn't make it to the gym as often as I planned. I'm going to try to be more consistent in July and make exercise a higher priority. I know it will be good for my physical and mental health.
        
    //         I also had a few rough patches in my relationships this month. I had a couple of misunderstandings with friends and it was hard to navigate those conflicts. But I'm glad we were able to talk things through and move past them. I value my relationships and I want to make sure I'm always working to be a good friend.
        
    //         Overall, it was a good month with a mix of ups and downs. I'm looking forward to what July has in store! I'm hoping to make some more progress on my goals and spend quality time with the people I care about.`
    //     }
    // ];
    // const note = Notes[0] || {};

    return (
        <>
        {data && <div className="w-1/2 bg-[#181818] px-12.5">
            {/* Title */}
            
            <div className="pt-12.5 pb-7.5 h-10 flex justify-between">
                <div className="text-white font-semibold text-[32px]">
                    {data.note.title}
                </div>
                <div>
                    <img src={ThreeDots} alt="Three Dots" onClick={handleToggle} />
                </div>
            </div>
            
            {/* On Clicking Add to Favorites Archive & delete */}
            <div className={`w-[51px] h-[38px] rounded-[6px] bg-[#333333] pl-4 top-25 right-60 absolute ${isVisible ? '' : 'hidden'}`} 
        id="FAD">
                <div className='flex pt-4'>
                    <img src={Favorite} className='pr-4'></img>
                    <p className='text-[#FFFFFF] text-[16px] '>Add to Favourites</p>
                </div>
                <div className='flex pt-5 pb-5'>
                    <img src={Archive} className='pr-4'></img>
                    <p className='text-[#FFFFFF] text-[16px]'>Archive</p>
                </div>
                <div className='w-[172px] border-t border-[#FFFFFF05]'> </div>
                <div className='flex pt-4'>
                    <img src={Delete} className='pr-4'></img>
                    <p className='text-[#FFFFFF] text-[16px]'>Delete</p>
                </div>

            </div>



            {/* Date and Folder */}
            <div className="pt-8">
                {/* Date Section */}
                <div className="flex items-center pb-4">
                    <img src={Calendar} className="pr-3" alt="Calendar" />
                    <p className="text-[#FFFFFF60] pr-7">Date</p>
                    <p className="text-white font-semibold text-4 underline">{data.note.createdAt}</p>
                </div>

                <div className="w-full border-t border-gray-300 my-4"></div>

                {/* Folder Section */}
                <div className="flex items-center pt-4">
                    <img src={Folder} className="pr-3" alt="Folder" />
                    <p className="text-[#FFFFFF60] pr-7">Folder</p>
                    <p className="text-white font-semibold text-4 underline">{data.note.folder.name}</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="pt-7.5 overflow-auto pb-27">
                <p className="text-[#FFFFFF] text-400">{data.note.content}</p>
            </div>
        </div>}
        </>
    );
}

export default RightBar;