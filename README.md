## RecipeApp ##

Search recipes from [TheMealDB](https://www.themealdb.com/) and chat with **Chef AI**, a cooking chatbot powered by a free, open-source AI model (Llama 3.2) running on the computer through [Ollama](https://ollama.com).

## Files

| File | What it does |
|------|--------------|
| `index.html` | Home page: recipe search + "Ask Chef AI" button (top-right) |
| `script.js` | Recipe search and recipe popup |
| `chat.html` | Chef AI chat page |
| `chatbot.js` | Sends questions to the AI and shows the answers |
| `style.css` | Styles for both pages |

## How the chatbot works

1. The user types a question on `chat.html`.
2. `chatbot.js` sends the conversation to Ollama at `http://localhost:11434/api/chat`.
3. Ollama runs the Llama 3.2 model on the computer and sends back the answer.
4. The answer is shown on the page.

There's no API key and no cost, and the data never leaves your computer.

## Setup

1. Install Ollama: https://ollama.com/download (or `winget install Ollama.Ollama` on Windows)
2. Restart VS Code / the terminal, then run: `ollama pull llama3.2`
3. Open `index.html` with Live Server and click **🍳 Ask Chef AI**

If the chatbot says *"Can't connect"*, open the Ollama app (or run `ollama serve`).
# RecipeAppChatbot
