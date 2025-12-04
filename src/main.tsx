import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import Chatbot from "./Chatbot.tsx";

document.getElementById("chatbot_root")!.onclick = (e) => {
	e.stopPropagation()
}
document.getElementById("chatbot-button")!.addEventListener("click", () => {
	document.getElementById("chatbot_root")!.classList.toggle("not-visible");
	document.querySelectorAll(".button-icon").forEach(el => {
		el.classList.toggle("not-visible");
	})
})

createRoot(document.getElementById('chatbot_root')!).render(
	<StrictMode>
		<Chatbot/>
	</StrictMode>,
)
