import type {TQuestions} from "./TQuestions.ts";

export interface TBot {
	name: string;
	questions: TQuestions;
	theme?: Theme
}

export interface Theme {
	primary?: string;
	"primary-dark"?: string;
	onprimary?: string;
	question?: string;
	"question-text"?: string;
	background?: string;
	option?: string;
	"option-hover"?: string;
	input?: string;
	"input-disabled"?: string;
}