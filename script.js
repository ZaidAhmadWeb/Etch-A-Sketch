const container = document.querySelector(".container");
const boxcountbutton = document.querySelector(".userValue");
const resetbutton = document.querySelector(".reset");
const colorbutton = document.querySelector(".colorbutton");
coloroption = "black";
let isDrawing = false;
let columns = 20;
container.style.cssText = `grid-template-columns:repeat(${columns}, 1fr); grid-template-rows:repeat(${columns}, 1fr);`;

function getRandomRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

colorbutton.textContent = "switch to RGB line";

colorbutton.addEventListener("click", () => {
    if(coloroption == "black"){
        coloroption = "RGB";
        colorbutton.textContent = "switch to Black line";
    }else{
        coloroption = "black";
        colorbutton.textContent = "switch to RGB line";   
    }
});


function createboxes(number){
    for(let i=0; i < number*number; i++){
        const contchild = document.createElement("div");
        contchild.classList.add("onebox");
        // contchild.addEventListener("mousemove",()=>{
        //     if(coloroption == "black"){
        //         contchild.style.cssText = "background-color:black;";
        //     }else{
        //         contchild.style.cssText = `background-color:${getRandomRGBColor()};`;
        //     }
        // })



        function applyColor(event) {
            if (coloroption === "black") {
                contchild.style.backgroundColor = "black";
            } else {
                contchild.style.backgroundColor = getRandomRGBColor();
            }
        }

        contchild.addEventListener("mousedown", (event) => {
            isDrawing = true;
            applyColor(event);
        });

        contchild.addEventListener("mouseover", (event) => {
            if (isDrawing) {
                applyColor(event);
            }
        });

        contchild.addEventListener("touchstart", (event) => {
            isDrawing = true;
            applyColor(event);
            event.preventDefault(); 
        });

        contchild.addEventListener("touchmove", (event) => {
            if (isDrawing) {
                applyColor(event);
                event.preventDefault(); 
            }
        });

        contchild.addEventListener("touchend", () => {
            isDrawing = false;
        });




        container.appendChild(contchild);
    }
}



boxcountbutton.addEventListener("click", () => {
    let numbers = prompt("Enter number of columns 1-100:");
    columns = parseInt(numbers, 10);
    container.style.cssText = `grid-template-columns:repeat(${columns}, 1fr); grid-template-rows:repeat(${columns}, 1fr);`;
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }    
    createboxes(columns);
})


resetbutton.addEventListener("click", () => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    createboxes(columns);
});

createboxes(columns);



