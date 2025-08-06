
let tarefasConcluidas = 0;

window.onload = function() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.forEach(tarefa => {
    RenderizarTarefa(tarefa);
    if (tarefa.concluida) {
      tarefasConcluidas++;
    }
  });
  document.querySelector("#contador").textContent = tarefasConcluidas + " tarefas concluídas";
};

function AddTarefa() {
  const tarefaTexto = document.querySelector("#Input-Task").value.trim();
  const tag = document.querySelector("#Input-Tag").value.trim();
  if (tarefaTexto === "") return;

  const novaTarefa = {
    texto: tarefaTexto,
    tag: tag,
    data: new Date().toLocaleDateString(),
    concluida: false
  };

  
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.push(novaTarefa);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));

  RenderizarTarefa(novaTarefa);

  document.querySelector("#Input-Task").value = "";
  document.querySelector("#Input-Tag").value = "";
}

function RenderizarTarefa(tarefa) {
  const tarefaDiv = document.createElement("div");
  tarefaDiv.className = "tarefa-item";

  const ul = document.createElement("ul");
  ul.className = "info-p";

  const liTask = document.createElement("li");
  liTask.className = "task";
  liTask.textContent = tarefa.texto;

  const liTag = document.createElement("li");
  liTag.className = "tag";
  liTag.textContent = tarefa.tag;

  const liData = document.createElement("li");
  liData.className = "data";
  liData.textContent = "Criado em: " + tarefa.data;

  ul.appendChild(liTask);
  ul.appendChild(liTag);
  ul.appendChild(liData);

  tarefaDiv.appendChild(ul);

  if (tarefa.concluida) {
    liTask.style.textDecoration = "line-through";
    liTask.style.color = "#8F98A8"

    const check = document.createElement("img");
    check.src = "./check.svg"; 
    check.alt = "Concluído";
    check.className = "check-icon";
    tarefaDiv.appendChild(check);

    document.querySelector("#Task-Concluida").appendChild(tarefaDiv);
  } else {
    const btnConcluir = document.createElement("button");
    btnConcluir.textContent = "Concluir";
    btnConcluir.onclick = function() {
      ConcluirTarefa(tarefa.texto);
    };
    tarefaDiv.appendChild(btnConcluir);
    document.querySelector("#To-Do-List").appendChild(tarefaDiv);
  }
}

function ConcluirTarefa(tarefaTexto) {
  
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  const index = tarefas.findIndex(t => t.texto === tarefaTexto && !t.concluida);
  if (index !== -1) {
    tarefas[index].concluida = true;
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  
  document.querySelector("#To-Do-List").innerHTML = "";
  document.querySelector("#Task-Concluida").innerHTML = "";
  tarefasConcluidas = 0;
  tarefas.forEach(tarefa => {
    RenderizarTarefa(tarefa);
    if (tarefa.concluida) tarefasConcluidas++;
  });

  document.querySelector("#contador").textContent = tarefasConcluidas + " tarefas concluídas";
}
