document.addEventListener("DOMContentLoaded", function () {
  fetch("popstarFAQ.xml")
    .then(response => response.text())
    .then(data => {
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(data, "text/xml");
      let faqs = xmlDoc.getElementsByTagName("faq");

      let faqContainer = document.getElementById("faq-container");

      for (let i = 0; i < faqs.length; i++) {
        let question = faqs[i].getElementsByTagName("question")[0].textContent;
        let answer = faqs[i].getElementsByTagName("answer")[0].textContent;

        let faqDiv = document.createElement("div"); // create the FAQ container div

        let questionDiv = document.createElement("div"); // create the question div
        questionDiv.classList.add("question");
        questionDiv.textContent = question;

        let answerDiv = document.createElement("div"); // create the answer div
        answerDiv.classList.add("answer");
        answerDiv.textContent = answer;
        answerDiv.style.display = "none"; // initially hide the answer

        // Add event listener for toggling the answer visibility
        questionDiv.addEventListener("click", function () { 
          answerDiv.style.display = answerDiv.style.display === "none" ? "block" : "none";
        });

        // Append the question and answer divs to the FAQ container
        faqDiv.appendChild(questionDiv);
        faqDiv.appendChild(answerDiv);

        // Append the FAQ to the container
        faqContainer.appendChild(faqDiv);
      }
    })
    .catch(error => console.error("Error loading XML:", error));
});
