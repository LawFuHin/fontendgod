const form = document.getElementById("myForm");
const input = document.getElementById("input");
const response = document.getElementById("response");
const display = document.getElementById("formContainer2");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  console.log("Asked:", input.value);

  response.textContent = "";
  const gif = document.createElement("img");
  gif.id = "gif";
  gif.src = "./image/page.gif";
  const span1 = document.createElement("span");
  span1.id = "loading";
  const span2 = document.createElement("span");
  span2.id = "waiting";
  response.appendChild(gif);
  response.appendChild(span1);
  response.appendChild(span2);

  display.style = "grid";
  display.scrollIntoView({ behavior: "smooth" });

  const loading = document.getElementById("loading");
  let secondsLeft = Math.floor(Math.random() * 26) + 10;
  let text = "神父正在處理" + secondsLeft + "名信徒的懺悔...";
  loading.textContent = text;
  const intervalId = setInterval(() => {
    secondsLeft--;
    text = "神父正在處理" + secondsLeft + "名信徒的懺悔...";
    loading.textContent = text;

    if (secondsLeft === 0) {
      clearInterval(intervalId);
    }
  }, 3000);

  var waitingTyped = new Typed("#waiting", {
    strings: [
      "請耐心等待，神父正在向主尋求指引。",
      "在等待回應的同時，讓我們花點時間反思和祈禱。",
      "有時候等待是對我們信仰的考驗。讓我們利用這段時間來加強我們對上帝的信任。",
      "主以神秘的方式行事，但神父相信他會引導我們找到正確的答案。",
      "當我們等待答案時，讓我們記住主一直與我們同在，他永遠不會拋棄我們。",
    ],
    typeSpeed: 200,
    backSpeed: 100,
    showCursor: false,
    startDelay: 2000,
    backDelay: 5000,
  });
  const inputValue = input.value;
  const requestBody = { message: `你是神父，這是我的懺悔${input.value}，請給我指導` };

  fetch("https://chatgpt-k89p.onrender.com/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("god:", data);
      response.textContent = `你：${inputValue}\n \n神父：${data}`;
      input.value = "";
      display.scrollIntoView({ behavior: "smooth" });
    })
    .catch((error) => {
      const img = document.createElement("img");
      img.id = "rip";
      img.src = "./image/rip.png";
      const span = document.createElement("span");
      span.id = "span-rip";
      span.textContent = "神父暫時比較繁忙，請重新嘗試";
      response.textContent = "";
      response.appendChild(img);
      response.appendChild(span);
      console.error(error);
    });
});
