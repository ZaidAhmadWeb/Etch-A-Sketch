const container = document.querySelector(".container");
const boxcountbutton = document.querySelector(".userValue");
const resetbutton = document.querySelector(".reset");
const colorbutton = document.querySelector(".colorbutton");
coloroption = "black";
let isDrawing = true;
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


// function createboxes(number){
//     for(let i=0; i < number*number; i++){
//         const contchild = document.createElement("div");
//         contchild.classList.add("onebox");
//         // contchild.addEventListener("mousemove",()=>{
//         //     if(coloroption == "black"){
//         //         contchild.style.cssText = "background-color:black;";
//         //     }else{
//         //         contchild.style.cssText = `background-color:${getRandomRGBColor()};`;
//         //     }
//         // });


//         function applyColor(event) {
//             if (coloroption === "black") {
//                 contchild.style.backgroundColor = "black";
//             } else {
//                 contchild.style.backgroundColor = getRandomRGBColor();
//             }
//         }

//         // Mouse events
//         contchild.addEventListener("mousedown", (event) => {
//             applyColor(event);
//             event.preventDefault(); // Prevent default behavior
//         });

//         contchild.addEventListener("mouseover", (event) => {
//             if (isDrawing) {
//                 applyColor(event);
//             }
//         });

//         // Touch events
//         contchild.addEventListener("touchstart", (event) => {
//             isDrawing = true;
//             applyColor(event);
//             event.preventDefault(); // Prevent default touch behavior
//         });

//         contchild.addEventListener("touchmove", (event) => {
//             if (isDrawing) {
//                 applyColor(event);
//                 event.preventDefault(); // Prevent default touch behavior
//             }
//         });

//         contchild.addEventListener("touchend", () => {
//             isDrawing = false;
//         });



//         container.appendChild(contchild);
//     }
// }



function applyColor(cell) {
    if (coloroption === "black") {
        cell.style.backgroundColor = "black";
    } else {
        cell.style.backgroundColor = getRandomRGBColor();
    }
}

function getCellAtPosition(x, y) {
    const rect = container.getBoundingClientRect();
    const cellSize = rect.width / columns;
    const col = Math.floor((x - rect.left) / cellSize);
    const row = Math.floor((y - rect.top) / cellSize);
    return container.querySelector(`.onebox:nth-child(${row * columns + col + 1})`);
}

function handleStart(event) {
    isDrawing = true;
    const x = event.clientX || event.touches[0].clientX;
    const y = event.clientY || event.touches[0].clientY;
    lastCell = getCellAtPosition(x, y);
    if (lastCell) {
        applyColor(lastCell);
    }
    event.preventDefault();
}

function handleMove(event) {
    if (!isDrawing) return;
    const x = event.clientX || event.touches[0].clientX;
    const y = event.clientY || event.touches[0].clientY;
    const currentCell = getCellAtPosition(x, y);
    if (currentCell && currentCell !== lastCell) {
        applyColor(currentCell);
        lastCell = currentCell;
    }
    event.preventDefault();
}

function handleEnd() {
    isDrawing = false;
    lastCell = null;
}

function createboxes(number) {
    container.style.gridTemplateColumns = `repeat(${number}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${number}, 1fr)`;

    // Clear existing boxes
    container.innerHTML = '';

    for (let i = 0; i < number * number; i++) {
        const contchild = document.createElement("div");
        contchild.classList.add("onebox");

        container.appendChild(contchild);
    }

    // Attach event listeners
    container.addEventListener("mousedown", handleStart);
    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseup", handleEnd);
    container.addEventListener("mouseleave", handleEnd);

    container.addEventListener("touchstart", handleStart);
    container.addEventListener("touchmove", handleMove);
    container.addEventListener("touchend", handleEnd);
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



