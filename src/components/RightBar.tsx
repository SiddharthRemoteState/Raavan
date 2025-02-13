import ThreeDots from '../logos/ThreeDot.svg'
import Calendar from '../logos/Calendar.svg'
import Folder from '../logos/Folderlogo.svg'
function RightBar(){
    const Notes = [
        {
          title: 'Reflection on the Month Of June',
          date: '12/12/2024',
          foldername: 'Personal',
          content: `It's hard to believe that June is already over! Looking back on the month, there were a few highlights that stand out to me.
      
          One of the best things that happened was getting promoted at work. I've been working really hard and it's great to see that effort recognized. It's also exciting to have more responsibility and the opportunity to contribute to the company in a bigger way. I'm looking forward to taking on new challenges and learning as much as I can in my new role.
      
          I also had a great time on my vacation to Hawaii. The beaches were beautiful and I loved trying all of the different types of Hawaiian food. It was nice to relax and get away from the daily grind for a bit. I'm so grateful to have had the opportunity to take a trip like that.
      
          On the downside, I feel like I didn't make as much progress on my fitness goals as I would have liked. I was really busy with work and didn't make it to the gym as often as I planned. I'm going to try to be more consistent in July and make exercise a higher priority. I know it will be good for my physical and mental health.
      
          I also had a few rough patches in my relationships this month. I had a couple of misunderstandings with friends and it was hard to navigate those conflicts. But I'm glad we were able to talk things through and move past them. I value my relationships and I want to make sure I'm always working to be a good friend.
      
          Overall, it was a good month with a mix of ups and downs. I'm looking forward to what July has in store! I'm hoping to make some more progress on my goals and spend quality time with the people I care about.`
        }
      ];
      
      function RightBar() {
        // Safely accessing Notes[0] if it exists
        const note = Notes[0] || {}; // If Notes is empty, it'll default to an empty object
      
        return (
          <div className="w-1/2 bg-[#181818] px-12.5">
            {/* Title */}
            <div className="pt-12.5 h-10 flex justify-between">
              <div className="text-white font-semibold text-[32px]">
                {note.title || "Default Title"}
              </div>
              <div>
                <img src={ThreeDots} alt="three dots" />
              </div>
            </div>
      
            {/* Date and Folder */}
            <div className="pt-30 h-16.25 flex">
              {/* Date Section */}
              <div className="flex-1 flex items-start">
                <img src={Calendar} className="pr-3" alt="calendar" />
                <p className="text-[#FFFFFF60] pr-7">Date</p>
                <p className="text-white font-semibold text-4">{note.date || "Default Date"}</p>
              </div>
      
              {/* Folder Section */}
              <div className="flex-1 flex items-start">
                <img src={Folder} className="pr-3" alt="folder" />
                <p className="text-[#FFFFFF60] pr-7">Folder</p>
                <p className="text-white font-semibold text-4">{note.foldername || "Default Folder"}</p>
              </div>
            </div>
      
            {/* Content */}
            <div className="pt-4">
              <p className="text-[#FFFFFF60]">{note.content || "No content available"}</p>
            </div>
          </div>
        );
      }
      
    return (<div className="w-1/2 bg-[#181818] px-12.5">

                {/* Title */}
                <div className='pt-12.5 h-10 flex justify-between '>
                    <div className='text-white font-semibold text-[32px]'>
                    {Notes[0].title}
                    </div>
                    <div>
                        <img src={ThreeDots}></img>
                    </div>
                </div>


                {/* Wrong Review   */}


                <div className='pt-30 h-16.25 pb-7.5'>
                    {/* date */}
                    <div className='flex-1 flex items-start border-2 border-amber-50'>
                        <img src={Calendar} className='pr-3'></img>
                        <p className='text-[#FFFFFF60] pr-7'>Date</p>
                        <p className='text-white font-semibold text-4 underline'>{Notes[0].date}</p>
                    </div>
                    {/* Folder */}
                    <div className='flex-1 flex items-start border-2 border-amber-50'>
                        <img src={Folder} className='pr-3'></img>
                        <p className='text-[#FFFFFF60] pr-7'>Folder</p>
                        <p className='text-white font-semibold text-4 underline'>{Notes[0].foldername}</p>
                    </div>
                </div>


            {/* Content */}
                <div className='pt-7.5 overflow-auto pb-27 '>
                    <p className='text-[#FFFFFF] text-400 '>{Notes[0].content}</p>
                </div>



            </div>
        
    )
}
export default RightBar;