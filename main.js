    const fetchJoke = async () => {
      try {
        const response = await fetch("https://icanhazdadjoke.com/", {
          headers: {
            Accept: "application/json",
          },
        });
        const data = await response.json();
        return data.joke;
      } catch (error) {
        console.error("Failed to fetch joke. Please try again.", error);
        return "Failed to fetch joke. Please try again.";
      }
    };

    const reportAcudits = [];

    const updateReportAcudits = (joke, score) => {
      const reportObject = {
        joke: joke,
        score: score,
        date: new Date().toISOString(),
      };
      reportAcudits.push(reportObject);
      console.log(reportAcudits);
    };

    document.addEventListener("DOMContentLoaded", () => {
      const jokeElement = document.getElementById("joke");
      const score1Btn = document.getElementById("score1Btn");
      const score2Btn = document.getElementById("score2Btn");
      const score3Btn = document.getElementById("score3Btn");
      const nextJokeBtn = document.getElementById("nextJokeBtn");

      if (jokeElement && score1Btn && score2Btn && score3Btn && nextJokeBtn) {
        let currentJoke = "";

        const showJoke = (joke) => {
          jokeElement.innerText = joke;
          score1Btn.style.display = "block";
          score2Btn.style.display = "block";
          score3Btn.style.display = "block";
        };

        const nextJoke = async () => {
          currentJoke = await fetchJoke();
          showJoke(currentJoke);
        };

        const handleScore = (score) => {
          updateReportAcudits(currentJoke, score);
        };

        score1Btn.addEventListener("click", () => handleScore(1));
        score2Btn.addEventListener("click", () => handleScore(2));
        score3Btn.addEventListener("click", () => handleScore(3));
        nextJokeBtn.addEventListener("click", nextJoke);

        score1Btn.style.display = "none";
        score2Btn.style.display = "none";
        score3Btn.style.display = "none";
        nextJoke();
      }
    });
  