const form = document.querySelector("form");

const email = document.getElementsByName("email");
const password = document.getElementsByName("password");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  async function fetcher() {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const fetchData = await response.json();
    console.log(fetchData);
    fetchData.success
      ? window.location.replace("/my-account")
      : window.location.replace("/error");
  }
  fetcher();
}
