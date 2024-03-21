document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "patch") {
    const id = event.target.dataset.id;
    const title = prompt("Введите новую заметку");
  
    if (!title) {
      return;
    } else {
      event.target.closest("li").textContent = title;
      updateNote(id, title)
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function updateNote(id, newTitle) {
  await fetch(`/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: newTitle
    }),
  });
}

