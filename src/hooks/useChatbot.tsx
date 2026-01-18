import {useCallback, useEffect, useState} from "react";
import type TConfig from "../types/TConfig.ts";

export default function useChatbot(initConfig?: TConfig) {
	const [config, setConfig] = useState<TConfig>(initConfig ?? { questions: {}, title: "Chatbot"});
	const init = useCallback((ev: Event) => {
		setConfig((ev as CustomEvent<TConfig>).detail)
	}, []);
	useEffect(() => {
		document.addEventListener("chatbot-init", init);
		document.dispatchEvent(new CustomEvent("chatbot-loaded"));
		return () => {
			document.removeEventListener("chatbot-init", init);
		}
	}, [init]);
	return config;
}