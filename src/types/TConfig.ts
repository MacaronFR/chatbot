import type {TQuestions} from "./TQuestions.ts";

export default interface TConfig {
	title: string;
	questions: TQuestions;
	onEnd?: (data: Record<string, any>) => void;
	endMessage?: string;
	endButtonText?: string;
}