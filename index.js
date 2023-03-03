import  {filterArray} from '/filtre.js'
let inputUserImg = document.querySelector('#inputImg')
console.log(filterArray)
function createImg(element){
    const fig = document.createElement('div')
    fig.className ='figGenerator'
    const logo = document.createElement('i')
    logo.className = ('fa-regular fa-heart')
    fig.appendChild(logo)
    
    const img = document.createElement('img')
    img.src = element.url
    img.className = ('img')
    fig.appendChild(img)
    return(fig)
    }
function getData() {
    
    const userPrompt = inputUserImg.value
    const inputNumber = document.querySelector('#number')
    
    fetch("https://api.openai.com/v1/images/generations", {
      method:"POST",
      body: JSON.stringify({
        prompt:userPrompt,
        n:2,
        size:"256x256"
      }),
      headers: {
        'Content-Type': 'application/json',
         Authorization: 'Bearer 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'
      }
    })
    .then(r => r.json())
    .then(data => {
        console.log(data)
        const contenantImg = document.querySelector('.contenantImg')
        contenantImg.innerHTML =('');
        data.data.forEach(element => contenantImg.appendChild(createImg(element)));
            
        

    
    })
  } 
 
const button = document.querySelector('.generator');
button.addEventListener('click', () =>{
    getData();
})

//filtre
let test = document.querySelectorAll('.filter')
let titleFilter = document.querySelectorAll('.titleFilter')
let sousTiltelFilter = document.querySelectorAll('.sousFilter')



//afficher le catalogue

let renduCatalog = document.querySelector('.renduCatalog')
function createElement(data){
    const fig = document.createElement('figure')
    fig.className = 'figCatalogue'
    fig.id = data.title
    
    const title = document.createElement('p')
    title.innerText = data.title
    fig.appendChild(title)
    const div = document.createElement('div')
    div.className = 'selectorImg'
    fig.appendChild(div)
    
    const add = document.createElement('i')
    add.className = 'fa-regular fa-plus'
    div.appendChild(add)
    const img = document.createElement('img')
    img.className = ('imgCatalogue')
    img.src = data.img
    div.appendChild(img)
   
    return fig

}
let buttonCatalogue = document.querySelectorAll('.buttonCatalogue')
buttonCatalogue.forEach(e => e.addEventListener('click', function(e){
    const idElement = e.target.id
    console.log(idElement)
    renduCatalog.innerHTML = ''
    renduCatalog.style.visibility = 'visible'
   
    filterArray.forEach(e => e.forEach(element => {if(idElement == element.type){
            renduCatalog.append(createElement(element))
    }}))

    
    

    //Afficher les icones +
    let add = document.querySelector('.fa-plus')
    let imgCatalogue = document.querySelectorAll('.imgCatalogue')
    let figCatalogue = document.querySelectorAll('.figCatalogue')
    let selectionStyle = document.querySelectorAll('.selectorImg')
    imgCatalogue.forEach(e => e.addEventListener('click', function(){
        if(e.previousElementSibling.style.transform == 'rotate(45deg)'){
            e.previousElementSibling.style.transform = ''
            e.previousElementSibling.style.color = ''
            e.style.border = ''
            e.style.opacity = ''
            e.parentElement.style.width = '100%'

        }else{
            e.previousElementSibling.style.transform = 'rotate(45deg)'
            e.previousElementSibling.style.color = 'red'
            e.style.border = 'solid 5px rgb(157, 108, 194)'
            e.style.opacity = '0.33' 
            e.parentElement.style.width = '90%'
        }
       
       
    }))

    //Ajout des mots clés
    
    figCatalogue.forEach(e => e.addEventListener('click', function(){
        console.log(e.id)
        if(inputUserImg.value.includes(e.id)){
            let currentVal = inputUserImg.value;
            let newVal = currentVal.replace(`,${e.id}`, "")
            inputUserImg.value = newVal 
        }else{
            inputUserImg.value = `${inputUserImg.value},${e.id}`
        }
       
        
    })
    )
})
)




   

