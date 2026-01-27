import type {TBot} from "./TBot.ts";

export default interface TConfig {
	bot: TBot;
	onEnd?: (data: Record<string, any>) => void;
	endMessage?: string;
	endButtonText?: string;
}