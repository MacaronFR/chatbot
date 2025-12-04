import {useEffect, useState} from "react";
import type TConfig from "../types/TConfig.ts";

export default function useChatbot() {
	const [config, setConfig] = useState<TConfig>({ questions: { start: { question: "Chatbot"}}, title: "Chatbot"})
	useEffect(() => {
		document.addEventListener("chatbot-init", (ev) => {
			setConfig((ev as CustomEvent<TConfig>).detail)
		});
	}, []);
	return config;
}