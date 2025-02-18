import Bigdoc from '../logos/DocumentBig.svg'

function ClosedNoteView(){
    return (
        <div className="w-1/2 bg-[#181818] px-12.5 min-h-screen flex justify-center items-center">
            <div className='flex flex-col justify-center items-center'>
                <img src={Bigdoc} alt="Big Document" className=''/>
                <h1 className='flex text-[28px] text-[#FFFFFF] font-semibold justify-center items-center pb-2.5'>Select a note to View</h1>
                <p className='font-400 text-[#FFFFFF60]'>Choose a note from the list on the left to view the contents or create a</p>
                <p className='font-400 text-[#FFFFFF60]'>new note to add to your collection</p>

            </div>
        </div>
      );
      
}
export default ClosedNoteView;