import type TConfig from "./types/TConfig.ts";

export function currentTime() {
	const now = new Date();
	return now.toLocaleTimeString("fr-FR", {hour: "2-digit", minute: "2-digit"});
}

export function initChatbot(config: TConfig) {
	const ev = new CustomEvent("chatbot-init", {detail: config});
	document.dispatchEvent(ev);
}