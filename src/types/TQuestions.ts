export type TQuestions = Record<string, TQuestion>

export interface TQuestion {
	question: string | string[];
	action?: TAction;
	answers?: TAnswer[];
	goto?: string;
	at?: string;
}

export interface TAnswer {
	text: string;
	next?: string;
	action?: TAction;
	at?: string;
}

interface TAction {
	action: "set" | "ask" | "end";
	property?: string;
	value?: any;
	goto?: string;
}