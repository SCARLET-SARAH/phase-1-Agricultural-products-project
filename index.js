let apiURL = "https://phase-1-agricultural-products-project-1.onrender.com"

const fetchData = () => {
    fetch(apiURL)
    .then(res => res.json())
    .then(data => {
        listNames(data)
        fetchFirstData(data)
    })
}

const fetchFirstData = (value) => {
    let first = value[0]
    console.log(first)
    detailDescription(first)
}

const listNames = (value) => {
    value.forEach(element => {
        let titleContainer = document.querySelector(".service_list")
        let soldOut = document.querySelector(".available_good")
        let names = document.createElement("a")
        names.innerHTML = element.title

        let diff = parseInt(element.available_slots) - parseInt(element.slots_remained)

        if (diff <= 0){
            let soldnames = document.createElement("a")
            soldnames.innerText = value.title
            soldOut.appendChild(names)

        }
        else{
            titleContainer.appendChild(names)
        } 

        let posId = element.id
        names.addEventListener("click", () => {
            listEachJob(posId)
        })
    })
}


const detailDescription = (value) => {
    // let card = document.querySelector(".card")
    let container = document.querySelector(".card-details")

    let title = document.createElement("h3")
    let company_name = document.createElement("h4")
    let location = document.createElement("p")
    let description = document.createElement("p")
    let availableServices = document.createElement("p")
    let apply_tender = document.createElement("button")
    let deleteTender = document.createElement("button")

    title.innerText = value.title
    company_name.innerText = value.company_name
    location.innerText = value.location
    description.innerText = value.description
    deleteJob.innerText = "Delete Tender"

    let diff = parseInt(value.available_slots) - parseInt(value.slots_remained)
    availableServices.innerText = `Available Slots: ${diff}`

    if (diff <= 0){
        apply_tender.innerText = "SOLD OUT"
        apply_tender.disabled = true  
    }
    else{
        apply_job.innerText = "Apply for tender"
    }

    container.appendChild(title) 
    container.appendChild(company_name)
    container.appendChild(location) 
    container.appendChild(description)
    container.appendChild(availableServices)
    container.appendChild(apply_tender) 
    container.appendChild(deleteTender)
    
    apply_tender.addEventListener('click', () => {
        value.slots_remained ++
        let slots_remained = value.slots_remained
        let posId = value.id
        console.log(slots_remained, posId)
        updateSlotNum(posId, {slots_remained})      
    })

    deleteTender.addEventListener("click", () => {
        let posId = value.id
        deleteData(posId) // Updated function name
    })
}

const listEachTender = (id) => {
    fetch(`${apiURL}/${id}`)
    .then(res => res.json())
    .then(data => detailDescription(data))
}

const updateSlotNum = (id, value) => {
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify(value)
    }
    fetch(`${apiURL}/${id}`, options)
    .then(res => res.json())
}

const deleteData = (id) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept":"application/json"
        },
        
    }
    fetch(`${apiURL}/${id}`, options)
    .then(res => res.json())
}

document.addEventListener('DOMContentLoaded',fetchData)