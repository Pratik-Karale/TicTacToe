function getElement(string){
    const tempDiv=document.createElement("div")
    tempDiv.innerHTML=string
    return tempDiv.firstChild
}