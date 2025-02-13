function CentreBar(){
    const FolderInfo=[{title:"Hey all What you want me to do",createdat:"12/12/27",content:"ejbjgvbjknkn"},{title:"Hey all What you want me to do",createdat:"12/12/27",content:"ejbjgvbjknkn"},{title:"Hey all What you want me to do",createdat:"12/12/27",content:"ejbjgvbjknkn"},{title:"Hey all What you want me to do",createdat:"12/12/27",content:"ejbjgvbjknkn"},{title:"Hey all What you want me to do",createdat:"12/12/27",content:"ejbjgvbjknkn"},{title:"Hey all What you want me to do",createdat:"12/12/27",content:"ejbjgvbjknkn"},{title:"Hey all What you want me to do",createdat:"12/12/27",content:"ejbjgvbjknkn"},{title:"Hey all What you want me to do",createdat:"12/12/27",content:"ejbjgvbjknkn"},{title:"Hey all What you want me to do",createdat:"12/12/27",content:"ejbjgvbjknkn"},{title:"Hey all What you want me to do",createdat:"12/12/27",content:"ejbjgvbjknkn"},{title:"Hey all What you want me to do",createdat:"12/12/27",content:"ejbjgvbjknkn"}]
    return (
        // most outer div
    <div className="w-1/4 bg-[#1C1C1C] h-full">
        
        <div className="w-full h-full pl-5 pr-5">
            {/* Personal name div */}
            <div className="pt-7.5 pr-12.5 pb-7.5 font-semibold text-white text-[22px]">
                Personal
            </div>

            <div className="h-full overflow-y-auto">
            {FolderInfo.map((arr,index)=>(
                    <div key={index} className="w-full h-24.5 bg-[#FFFFFF33]  mb-4 p-5 flex-col ">
                    <div className="text-white flex ">{arr.title}</div>
                    <div className="flex w-full ">
                        <div className="text-400 text-[#FFFFFF60] pr-2.5  ">{arr.createdat}</div>
                        <div className="text-400 text-[#FFFFFF60]  ">{arr.content}</div>
                    </div>
                    </div>
               
            ))
            
            }
            </div>
            <div>
                
            </div>
        </div>


    </div>
    )
}
export default CentreBar;