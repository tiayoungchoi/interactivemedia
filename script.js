let selectedShape = null;
const compositionArea = document.getElementById('composition-area');

// Shape selection buttons
document.getElementById('rectBtn').addEventListener('click', () => {
    selectedShape = 'rectangle';
    addShapeToCompositionArea();
});

document.getElementById('verticalRectBtn').addEventListener('click', () => {
    selectedShape = 'vertical-rectangle';
    addShapeToCompositionArea();
});

document.getElementById('circleBtn').addEventListener('click', () => {
    selectedShape = 'circle';
    addShapeToCompositionArea();
});

document.getElementById('starBtn').addEventListener('click', () => {
    selectedShape = 'star';
    addShapeToCompositionArea();
});

document.getElementById('rotatedRectBtn').addEventListener('click', () => {
    selectedShape = 'rotated-rectangle';
    addShapeToCompositionArea();
});

document.getElementById('flippedRotatedRectBtn').addEventListener('click', () => {
    selectedShape = 'flipped-rotated-rectangle';
    addShapeToCompositionArea();
});

// Clear button
document.getElementById('clearBtn').addEventListener('click', () => {
    const shapes = document.querySelectorAll('#composition-area .shape');
    shapes.forEach(shape => shape.remove());
});

// Auto generate button
document.getElementById('autoGenerateBtn').addEventListener('click', () => {
    autoGenerateTreeBranch();
});

// Function to add a selected shape to the composition area
function addShapeToCompositionArea() {
    if (selectedShape) {
        const shapeElement = document.createElement('div');

        // Handle specific styles for the star
        if (selectedShape === 'star') {
            shapeElement.textContent = '★';
            shapeElement.classList.add('shape', 'star');
        } else {
            shapeElement.classList.add('shape', selectedShape);
        }

        randomizeShapeSize(shapeElement, selectedShape);

        // Set a default position within the composition area
        shapeElement.style.position = 'absolute';
        shapeElement.style.left = '50px';
        shapeElement.style.top = '50px';
        compositionArea.appendChild(shapeElement);

        // Make the shape draggable
        dragElement(shapeElement);

        // Add double-click event to remove the shape
        shapeElement.addEventListener('dblclick', () => {
            shapeElement.remove();
        });

        // Reset selectedShape after adding
        selectedShape = null;
    }
}

// Function to auto-generate a tree branch with shapes
function autoGenerateTreeBranch() {
    const shapes = document.querySelectorAll('#composition-area .shape');
    shapes.forEach(shape => shape.remove());

    const numberOfShapes = 10;
    const shapeTypes = ['rectangle', 'vertical-rectangle', 'circle', 'star', 'rotated-rectangle', 'flipped-rotated-rectangle'];

    let x = 50;
    let y = 50;
    let verticalOffset = 0;
    let horizontalOffset = 0;

    for (let i = 0; i < numberOfShapes; i++) {
        const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const shapeElement = document.createElement('div');
        shapeElement.classList.add('shape', shapeType);

        // Randomize size for the shapes
        randomizeShapeSize(shapeElement, shapeType);

        // Set position
        shapeElement.style.left = `${x}px`;
        shapeElement.style.top = `${y}px`;
        compositionArea.appendChild(shapeElement);

        // Make the shape draggable
        dragElement(shapeElement);

        // Add double-click event to remove the shape
        shapeElement.addEventListener('dblclick', () => {
            shapeElement.remove();
        });

        // Alternate positioning
        if (i % 2 === 0) {
            y += verticalOffset;
        } else {
            x += horizontalOffset;
        }

        verticalOffset = 0;
        horizontalOffset = 0;
    }
}

// Function to randomize shape sizes
function randomizeShapeSize(shapeElement, shapeType) {
    let width, height;

    switch (shapeType) {
        case 'rectangle':
        case 'rotated-rectangle':
        case 'flipped-rotated-rectangle':
            width = Math.floor(Math.random() * 100 + 50); // Random length between 50 and 150
            height = 20; // Fixed height
            break;
        case 'vertical-rectangle':
            width = 20; // Fixed width
            height = Math.floor(Math.random() * 100 + 50); // Random height between 50 and 150
            break;
        case 'circle':
            width = Math.floor(Math.random() * 30 + 20); // Random diameter between 20 and 50
            height = width; // Ensure it stays a circle
            shapeElement.style.borderRadius = '50%'; // Circle shape
            break;
        case 'star':
            const starSize = Math.floor(Math.random() * 30 + 20); // Random size between 20 and 50
            width = starSize;
            height = starSize;
            shapeElement.style.fontSize = `${starSize}px`; // Adjust font size for the star
            break;
        default:
            width = 50; // Default size
            height = 50;
            break;
    }

    shapeElement.style.width = `${width}px`;
    shapeElement.style.height = `${height}px`;
}

// Function to make shapes draggable
function dragElement(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    element.onmousedown = (e) => {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    };

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
