document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loginForm) {
    const errorMsg = document.getElementById("errorMsg");
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      window.location.href = "notas.html";
    }
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const codigo = document.getElementById("codigo").value;
      const password = document.getElementById("password").value;
      const data = await login(codigo, password);
      if (data && data.codigo) {
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "notas.html";
      } else {
        errorMsg.textContent = "Credenciales inválidas";
        loginForm.reset();
      }
    });
  }
  if (logoutBtn) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.href = "index.html";
      return;
    }
    document.getElementById("userInfo").innerHTML = `
      <p><b>Código:</b> ${user.codigo}</p>
      <p><b>Nombre:</b> ${user.nombre}</p>
      <p><b>Email:</b> ${user.email}</p>`;
    loadNotas(user.codigo);
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "index.html";
    });
  }
});
async function loadNotas(codigo) {
  const data = await getNotas(codigo);

  // El JSON trae { login, codigo, notas, mensaje }
  const notas = data.notas || [];

  const tbody = document.querySelector("#notasTable tbody");
  tbody.innerHTML = "";

  let totalCreditos = 0;
  let sumaPonderada = 0;

  notas.forEach(n => {
    const c = parseInt(n.creditos);
    const n1 = parseFloat(n.n1);
    const n2 = parseFloat(n.n2);
    const n3 = parseFloat(n.n3);
    const ex = parseFloat(n.ex);

    const definitiva = (((n1 + n2 + n3) / 3) * 0.7) + (ex * 0.3);

    const row = `
      <tr>
        <td>${n.asignatura}</td>
        <td>${c}</td>
        <td>${n1}</td>
        <td>${n2}</td>
        <td>${n3}</td>
        <td>${ex}</td>
        <td><b>${definitiva.toFixed(2)}</b></td>
      </tr>
    `;
    tbody.innerHTML += row;

    sumaPonderada += definitiva * c;
    totalCreditos += c;
  });

  const promedio = sumaPonderada / totalCreditos;
  document.getElementById("promedio").textContent =
    `Promedio Ponderado: ${promedio.toFixed(2)}`;
}


