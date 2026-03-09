const badges = (lebels) => {
    const newBadge = lebels.map(lebel => `<span class="badge badge-warning text-xs font-semibold">${lebel}</span>`)
    return(newBadge.join(" "))

}

const loadAllIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((data) => displayAllIssues(data.data))
}
const displayAllIssues = (issues) => {

    const section = document.getElementById("issues-section")
    section.innerHTML = ""
    issues.forEach(issue => {
         let borderT = '';
    if(issue.status === 'open'){
        borderT = 'border-t-4 border-[#00A96E]';
    }
    else if(issue.status === 'closed'){
        borderT = 'border-t-4 border-[#A855F7]';
    }
        // {
        // "id": 1,
        // "title": "Fix navigation menu on mobile devices",
        // "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
        // "status": "open",
        // "labels": [
        // "bug",
        // "help wanted"
        // ],
        // "priority": "high",
        // "author": "john_doe",
        // "assignee": "jane_smith",
        // "createdAt": "2024-01-15T10:30:00Z",
        // "updatedAt": "2024-01-15T10:30:00Z"
        // },

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
        section.appendChild(newdiv)

    })

}

loadAllIssues()

let currentTab="all"
const switchTab=(value)=>{
    const tabs=["all","open","closed"]
    for(const t of tabs){
        const TabName=document.getElementById("tab-"+t)
        if(t===value){
            TabName.classList.remove("btn-soft")

        }
        else{
            TabName.classList.add("btn-soft")
        }
    }
}