//Use fetch to request data from the dictionary API.
//Parse the API response to extract relevant details (definitions, synonyms, pronunciation).
//Update the DOM dynamically with the fetched data.
//Add event listenershttps://api.dictionaryapi.dev/api/v2/entries/en to handle form submission and user actions.

let BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

document.getElementById("searchForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let word = document.getElementById("wordInput").value;

    fetch(`${BASE_URL}/${word}`)
        .then(response => response.json())
        .then(data => {

            if (data.title) {
                document.getElementById("error").textContent = data.message;

                document.getElementById("wordTitle").textContent = "";
                document.getElementById("partOfSpeech").textContent = "";
                document.getElementById("definition").textContent = "";
                document.getElementById("example").textContent = "";
                document.getElementById("audio").src = "";
            } else {
                document.getElementById("error").textContent = "";

                document.getElementById("wordTitle").textContent = data[0].word;

                document.getElementById("partOfSpeech").textContent =
                    data[0].meanings[0].partOfSpeech;

                document.getElementById("definition").textContent =
                    data[0].meanings[0].definitions[0].definition;

                document.getElementById("example").textContent =
                    data[0].meanings[0].definitions[0].example || "No example available.";

                document.getElementById("audio").src =
                    data[0].phonetics?.[0]?.audio || "";

            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("error").textContent =
                "An error occurred while fetching data.";
        });
});
