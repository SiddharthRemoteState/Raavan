import Restore from '../logos/Restore.svg'
import Favorite from '../logos/Favorites.svg' 
import Archive from '../logos/Archived.svg'
import Delete from '../logos/Trash.svg'
function RestoreView(){
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
    return(<div className="w-1/2 bg-[#181818] px-12.5 min-h-screen flex justify-center items-center">


            <div className='flex flex-col justify-center items-center'>
                <img src={Restore} alt="Big Document" className=''/>
                <h1 className='flex text-[28px] text-[#FFFFFF] font-semibold justify-center items-center pb-2.5'>Restore  "{Notes[0].title}"</h1>
                <p className='font-400 text-[#FFFFFF60] text-[16px]'>Do you want to lose this note? It's not too late ! Just Click the Restore</p>
                <p className='font-400 text-[#FFFFFF60]'>button it will be added back to your list . It's that Simple</p>
                <button className='bg-[#312EB5] w-28 h-10.5 mt-2.5 cursor-pointer text-[#FFFFFF] font-400 rounded-[6px] text-[16px]'>Restore</button>
            </div>

            

        </div>)
}
export default RestoreView;