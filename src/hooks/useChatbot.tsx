import {useCallback, useEffect, useState} from "react";
import type TConfig from "../types/TConfig.ts";
import type {Theme} from "../types/TBot.ts";

export default function useChatbot(initConfig?: TConfig) {
	const [config, setConfig] = useState<TConfig>(initConfig ?? { bot: { name: "Chatbot", questions: {}}});
	const init = useCallback((ev: Event) => {
		setConfig((ev as CustomEvent<TConfig>).detail);
		const theme = (ev as CustomEvent<TConfig>).detail.bot.theme
		if(theme) {
			document.getElementById("chatbot-button")!.style.cssText = cssStringFromTheme(theme)
		}
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

function cssStringFromTheme(theme: Theme): string {
	let css = "";
	if(theme.primary) css += `--color-primary: ${theme.primary};\n`;
	if(theme["primary-dark"]) css += `--color-primary-dark: ${theme["primary-dark"]};\n`;
	if(theme.onprimary) css += `--color-onprimary: ${theme.onprimary};\n`;
	if(theme.question) css += `--color-question: ${theme.question};\n`;
	if(theme["question-text"]) css += `--color-question-text: ${theme["question-text"]};\n`;
	if(theme.background) css += `--color-background: ${theme.background};\n`;
	if(theme.option) css += `--color-option: ${theme.option};\n`;
	if(theme["option-hover"]) css += `--color-option-hover: ${theme["option-hover"]};\n`;
	if(theme.input) css += `--color-input: ${theme.input};\n`;
	if(theme["input-disabled"]) css += `--color-input-disabled: ${theme["input-disabled"]};\n`;
	return css;
}