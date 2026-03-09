const badges = (lebels) => {
    const newBadge = lebels.map(lebel => `<span class="badge badge-warning text-xs font-semibold">${lebel}</span>`)
    return (newBadge.join(" "))

}

const manageSpinner=(result)=>{
    if(result==true){
        document.getElementById("spinner").classList.remove("hidden")
        const allsec=document.querySelectorAll("#allIssues-section,#open-section,#close-section")
        allsec.forEach(sec => {
            sec.classList.add("hidden")
        });
    }
    else{
         document.getElementById("spinner").classList.add("hidden")
        const allsec=document.querySelectorAll("#allIssues-section,#open-section,#close-section")
        allsec.forEach(sec => {
            sec.classList.remove("hidden")
        });
    }
    }


const loadAllIssues = () => {
    manageSpinner(true)
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((data) => {
            displayAllIssues(data.data)
            switchTab("all")
        })
}
const displayAllIssues = (issues) => {

    const section = document.getElementById("issues-section")
    section.innerHTML = ""
    const Opensection = document.getElementById("Openissues-section")
    Opensection.innerHTML = ""
    const Closesection = document.getElementById("Closedissues-section")
     Closesection.innerHTML = ""
    issues.forEach(issue => {
        let borderT = '';
        if (issue.status === 'open') {
            borderT = 'border-t-4 border-[#00A96E]';
        }
        else if (issue.status === 'closed') {
            borderT = 'border-t-4 border-[#A855F7]';
        }



        const newdiv = document.createElement("div")
        newdiv.innerHTML = ` <div  class="card flex flex-col   text-center bg-white rounded-2xl shadow-md px-5 py-10 space-y-4 ${borderT}">
                <!-- status div -->
                <div class="flex justify-between gap-3">
                    <div class="w-6"><img src="Status.png" alt=""></div>
                    <div class="badge badge-info">${issue.priority}</div>
                </div>
                <div class="items-start space-y-2">
                    <h2 class="font-extrabold text-sm text-left">${issue.title}</h2>
                <p class="text-start text-xs" >${issue.description}</p>
                </div>
                <div class=" flex gap-3 ">
                    <div class="">${badges(issue.labels)}</div>
                    
                </div>
                <!-- create and update date -->
                <div class="text-xs flex justify-between">
                    <p>${issue.author}</p>
                    <p>${issue.createdAt}</p>
                </div>
                <div class="text-xs text-start space-y-1">
                    <p>Assignee: ${issue.assignee}</p>
                    <div class="flex justify-between">
                    <p>updated at:</p>
                    <p>${issue.updatedAt}</p>
                    </div>
                </div>

            </div>`
        
        if(issue.status==="open" || issue.status==="closed" ){
            section.appendChild(newdiv)
        }
        if(issue.status==="open"){
            const openClone=newdiv.cloneNode(true)
            Opensection.appendChild(openClone)

        }
         if(issue.status==="closed"){
            const closeNode=newdiv.cloneNode(true)
           Closesection.appendChild(closeNode)

        }
        

    })

manageSpinner(false)
}
loadAllIssues()

const allSec=document.getElementById("issues-section")
let currentTab = "all"
const allSection = document.getElementById("allIssues-section")
const openSection = document.getElementById("open-section")
const closedSection = document.getElementById("close-section")
const stat=document.getElementById("stat")
const switchTab = (value) => {
   
    const tabs = ["all", "open", "closed"]
    for (const t of tabs) {
    
        const TabName = document.getElementById("tab-" + t)
        if (t === value) {
            TabName.classList.remove("btn-soft")

        }
        else {
            TabName.classList.add("btn-soft")
        }
    }
    

    const sections=[allSection,openSection,closedSection]
    for( const sec of sections){
        sec.classList.add("hidden")
    }
    if (value === "all") {
        allSection.classList.remove("hidden")
       
        
    }
    else if (value === "open") {
        openSection.classList.remove("hidden")
        

    }
    else {
        closedSection.classList.remove("hidden")
        
    } 
    
     
}
switchTab(currentTab)

document.getElementById("search-button").addEventListener("click", ()=>{
    const value=document.getElementById("input")
    const searchValue=value.value.trim().toLowerCase()
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res)=>res.json())
    .then((data)=>{
        const allWords=data.data
        const filterWords=allWords.filter(word=>
            word.title.includes(searchValue)
        )
        displayAllIssues(filterWords)
        switchTab("all")
    })
})

