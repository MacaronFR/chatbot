import type TConfig from "./types/TConfig.ts";

export function currentTime() {
	const now = new Date();
	return now.toLocaleTimeString("fr-FR", {hour: "2-digit", minute: "2-digit"});
}

export function initChatbot(config: TConfig) {
	const ev = new CustomEvent("chatbot-init", {detail: config});
	document.dispatchEvent(ev);
}

export function initEventListeners() {
	document.getElementById("chatbot_root")!.onclick = (e) => {
		e.stopPropagation();
	}
	document.getElementById("chatbot-button")!.addEventListener("click", () => {
		document.getElementById("chatbot_root")!.classList.toggle("not-visible");
		document.querySelectorAll(".button-icon").forEach(el => {
			el.classList.toggle("not-visible");
		});
	});
}