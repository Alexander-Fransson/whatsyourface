const randName = (len, score, correct, nameList) => {
  let names = [];
  if (nameList) {
    names = nameList;
  } else {
    names = [
      "Alexander Fransson",
      "Alexander Gudmundsson",
      "Axel Jobson",
      "Axel Svendsen",
      "Daniel Ljung",
      "Eric Dahlgren",
      "Frans karlsson",
      "Isac Ekeroth",
      "Jack Blomquist",
      "Joel Lundhag",
      "Jonas Olanders",
      "Linu Gamborn",
      "Linus Eriksson",
      "Nichlas Jensen",
      "Sebastian Martinsson",
      "Simon Liander",
      "Viktor Rozman",
      "Viktor Söderborg",
    ];
  }
  const result = [];
  if (names.length != score[1].length - 1) {
    for (let i = 0; i < len; i++) {
      temp = names[Math.floor(Math.random() * names.length)];
      if (i == correct) {
        if (score[1].includes(temp) || result.includes(temp)) {
          i--;
        } else {
          result.push(temp);
        }
      } else {
        if (result.includes(temp)) {
          i--;
        } else {
          result.push(temp);
        }
      }
    }
  } else {
    localStorage.removeItem("score");
    localStorage.removeItem("namesGone");
    location.reload();
  }
  return result;
};

//gör alt 1 röd on click
const makeRed = (buttons, i, score) => {
  buttons[i].style.backgroundColor = "red";
  buttons[i].classList.add("activated");
  score[2]++;
};

const makeGreen = (buttons, correct, score) => {
  for (let i = 0; i < 4; i++) {
    if (i != correct) {
      buttons[i].style.backgroundColor = "red";
    } else {
      buttons[i].style.backgroundColor = "green";
    }
  }
  score[0] = parseInt(score[0]) + 16 - score[2];
  localStorage.setItem("score", score[0]);
  localStorage.setItem("namesGone", score[1]);
  location.reload();
};

const setImg = (names, correct, score, buttons) => {
  const img = document.querySelector(".startPage>#pictures>input").files;
  for (let i = 0; i < img.length; i++) {
    if (
      img[i].name ==
      names[correct].toLowerCase().replace(" ", "-") + ".jpeg"
    ) {
      fr = new FileReader();
      fr.addEventListener("load", () => {
        document.querySelector("#bild").src = fr.result;
        startQuiz(names, score, correct, buttons);
      });
      fr.readAsDataURL(img[i]);
    }
  }
};

const handleTextFile = (correct, score, buttons) => {
  const [file] = document.querySelector(".startPage>#names>input").files;
  fr = new FileReader();
  fr.readAsText(file);
  fr.addEventListener(
    "load",
    () => {
      const name = randName(4, score, correct, fr.result.split("\n"));
      setImg(name, correct, score, buttons);
    },
    false
  );
};
const startQuiz = (names, score, correct, buttons) => {
  score[1].push(names[correct]);
  document.querySelector("#score").innerHTML = score[0];

  for (let i = 0; i < buttons.length; i++) {
    if (i != correct) {
      buttons[i].addEventListener("click", () => {
        makeRed(buttons, i, score);
      });
    } else {
      buttons[i].addEventListener("click", () => {
        makeGreen(buttons, i, score);
      });
    }
    buttons[i].innerHTML = names[i];
  }
};

const quizController = (startPage) => {
  startPage.style.display = "none";
  if (document.querySelectorAll(".alla-alt")) {
    const buttons = document.querySelectorAll(".alla-alt");
    const correct = Math.floor(Math.random() * 4);
    let score = [
      localStorage.getItem("score") || 0,
      localStorage.getItem("namesGone")
        ? localStorage.getItem("namesGone").split(",")
        : ["1234"],
      0,
    ];
    const isItTrue =
      document.querySelector(".startPage>#names>input").value != "" &&
      document.querySelector(".startPage>#pictures>input").value != "";
    if (isItTrue) {
      handleTextFile(correct, score, buttons);
    } else {
      const names = randName(4, score, correct, null);
      document.querySelector("#bild").src =
        "./img/" + names[correct].toLowerCase().replace(" ", "-") + ".jpeg";
      startQuiz(names, score, correct, buttons);
    }
  }
};

document.querySelector(".temp").addEventListener("click", () => {
  finished();
});

const finished = () => {
  localStorage.removeItem("score");
  localStorage.removeItem("namesGone");
  location.reload();
};

const selectionScreen = (play, info, startPage) => {
  play.remove();
  info.remove();
  const names = document.querySelector("#names");
  const picture = document.querySelector("#pictures");
  const startGame = document.querySelector("#startGame");
  const p = startPage.querySelectorAll(":scope > p");
  names.classList.remove("hidden");
  picture.classList.remove("hidden");
  startGame.classList.remove("hidden");
  for (let i = 0; i < p.length; i++) p[i].classList.remove("hidden");
  startGame.addEventListener("click", () => {
    quizController(startPage);
  });
};

const infoScreen = (play, info, startPage) => {};

if (document.querySelector("#play") && document.querySelector("#info")) {
  const startPage = document.querySelector(".startPage");
  if (localStorage.getItem("score")) {
    quizController(startPage);
  } else {
    startPage.style.display = "flex";
    const play = document.querySelector("#play");
    const info = document.querySelector("#info");
    play.addEventListener("click", () => {
      selectionScreen(play, info, startPage);
    });
    info.addEventListener("click", () => {
      infoScreen(play, info, startPage);
    });
  }
}

const showExample = () => {
  if (document.querySelector("#example")) {
    document.querySelector("#example").remove();
  } else {
    const img = document.createElement("img");
    img.src = "./img/nameListExample.jpeg";
    img.style.position = "absolute";
    img.style.bottom = "0";
    img.style.width = "20vw";
    img.style.zIndex = 300;
    img.id = "example";
    document.body.appendChild(img);
  }
};

if (document.querySelector(".startPage>p>a")) {
  document
    .querySelector(".startPage>p>a")
    .addEventListener("click", showExample);
}