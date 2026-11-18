const OLLAMA_URL = "http://localhost:11434/api/chat"; // Ollama's chat address
const MODEL_NAME = "llama3.2";                         // model downloaded with: ollama pull llama3.2

// ---------- Get the HTML elements ----------
const chatMessages = document.querySelector(".chat-messages");
const chatForm = document.querySelector(".chat-form");
const chatInput = document.querySelector(".chat-input");
const chatSend = document.querySelector(".chat-send");

// ---------- Conversation memory ----------

const messages = [
    {
        role: "system",
        content: "You are Chef AI, a friendly cooking assistant on a recipe website. " +
                 "Only answer questions about food, recipes and cooking. " +
                 "Keep answers short and simple for beginners. Use plain text, no markdown."
    }
];

// ---------- Show a message on the page ----------
function addMessage(text, type) {
    const div = document.createElement("div");
    div.classList.add("message", type); // type is "user" or "bot"
    div.textContent = text;              
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight; // scroll to the newest message
    return div;
}

// ---------- Ask the AI ----------
async function askChefAI(question) {

    addMessage(question, "user");
    messages.push({ role: "user", content: question });

    const thinking = addMessage("Thinking...", "bot");
    chatSend.disabled = true;

    try {
        const res = await fetch(OLLAMA_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: MODEL_NAME,
                messages: messages,
                stream: false // wait for the full answer
            })
        });

        const data = await res.json();

        if (data.error) {
            // e.g. the model is not downloaded yet
            thinking.textContent = "Error: " + data.error;
            messages.pop(); // remove the question that failed
            return;
        }

        const answer = data.message.content;
        thinking.textContent = answer;
        messages.push({ role: "assistant", content: answer });

    } catch (error) {
        // fetch fails when Ollama is not running
        thinking.textContent = "Can't connect to Chef AI. Please make sure Ollama is running.";
        messages.pop(); // remove the question that failed
        console.error(error);

    } finally {
        chatSend.disabled = false;
        chatInput.focus();
    }
}

// ---------- When the user presses Send ----------
chatForm.addEventListener("submit", (e) => {
    e.preventDefault(); // stop the page from reloading

    const question = chatInput.value.trim();
    if (!question) return;

    chatInput.value = "";
    askChefAI(question);
});
