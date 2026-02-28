//Switches Visibility
function toggleVisibility(id) {
    const element = document.getElementById(id);
    if (element.style.visibility === "hidden" || element.style.visibility === "") {
        element.style.visibility = "visible";
    }
        else {
        element.style.visibility = "hidden";
    }
}
//Background flips
const backgrounds = [
    "url('https://images.unsplash.com/photo-1609793783813-baafd4ad9def?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    "url('https://stanforddaily.com/wp-content/uploads/2021/05/The-Off-Season.png') top left repeat",
    "url('https://upload.wikimedia.org/wikipedia/en/7/76/ColeWorld.jpeg')",
    "url('https://i.scdn.co/image/ab67616d0000b273f4ca75192df162f78a24023e')",
    "url('https://media.thecrimson.com/photos/2026/02/19/005505_1383960.png')"
];
let bgIndex = 0;
function toggleBackground() {
    bgIndex = (bgIndex + 1) % backgrounds.length;
    document.body.style.background = backgrounds[bgIndex];
}



//Search Related
//General function
async function serperSearch(query, apiKey = "59752cd4acc7b89ddf98f7f602afacac9cccf3c5") {
    const encodedQuery = encodeURIComponent(query.trim());
    const url = `https://google.serper.dev/search?q=${encodedQuery}&apiKey=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
}
//Helpers to renderResults
function renderKnowledgeGraph(graph, container) {
    if (!graph) return;

    container.innerHTML += `
        <section class="knowledge-graph">
            <h2>${graph.title}</h2>
            <p>${graph.description || ""}</p>
            ${graph.imageUrl ? `<img src="${graph.imageUrl}" width="200">` : ""}
        </section>
        <hr>
    `;
}

function renderOrganicResults(results, container) {
    if (!results) return;

    container.innerHTML += `<h2>Results</h2>`;

    results.forEach(result => {
        container.innerHTML += `
            <div class="result">
                <a href="${result.link}" target="_blank">
                    <h3>${result.title}</h3>
                </a>
                <p>${result.snippet}</p>
            </div>
        `;
    });

    container.innerHTML += `<hr>`;
}

function renderPeopleAlsoAsk(questions, container) {
    if (!questions) return;

    container.innerHTML += `<h2>People Also Ask</h2>`;

    questions.forEach(q => {
        container.innerHTML += `
            <div class="paa">
                <strong>${q.question}</strong>
                <p>${q.snippet || ""}</p>
            </div>
        `;
    });

    container.innerHTML += `<hr>`;
}

function renderRelatedSearches(searches, container) {
    if (!searches) return;

    container.innerHTML += `<h2>Related Searches</h2><ul>`;

    searches.forEach(item => {
        container.innerHTML += `
            <li>${item.query}</li>
        `;
    });

    container.innerHTML += `</ul>`;
}

//Runs The Thang
async function runSearch() {
    const query = document.getElementById("Query").value;
    const container = document.getElementById("searchResults");

    container.innerHTML = "Loading...";

    try {
        const data = await serperSearch(query);
        renderResults(data, container);
    } catch (error) {
        container.innerHTML = "Search failed.";
        console.error(error);
    }
}
//Shows Results
function renderResults(data, container) {
    container.innerHTML = "";
    toggleVisibility("searchResults");
    renderKnowledgeGraph(data.knowledgeGraph, container);
    renderOrganicResults(data.organic, container);
    renderPeopleAlsoAsk(data.peopleAlsoAsk, container);
    renderRelatedSearches(data.relatedSearches, container);
}

function showTime() {


    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    // Format to HH:MM (24-hour format)
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    const formattedTime = hours + ":" + minutes;

    // Load time into div
    $("#time").html("<h2>Current Time</h2><p>" + formattedTime + "</p>");

    // Open jQueryUI dialog
    $("#time").dialog({
        modal: true,
        title: "Current Time",
        width: 300
    });
}


