export function drag_drop(container) {
  const draggables = container.querySelectorAll(".drag_item");
  const containers = document.querySelectorAll("track_listing")

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      //   console.log("dragstart !!");
      draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });


  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    // console.log(afterElement)
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })


function getDragAfterElement(track_list, y) {
  const draggableElements = [...track_list.querySelectorAll('.drag_item:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2;
    // console.log(offset);
    if(offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child}
    } else {
      return closest;
    }
  }, {offset: Number.NEGATIVE_INFINITY }).element
  
}
}
