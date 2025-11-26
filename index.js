const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const inpuEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");


let myLeads = [];
const LeadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (LeadsFromLocalStorage) {
    myLeads = LeadsFromLocalStorage;
    render(myLeads);
}


function render(Lead) {
    let listItems = "";
    for (let i = 0; i < Lead.length; i++) {
        listItems += `<li>
                        <a href="${Lead[i]}" target="_blank">
                            ${Lead[i]}
                        </a>
                     </li>`;
    }
    ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
    myLeads.push(inpuEl.value);
    inpuEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
})


tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })

})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})
