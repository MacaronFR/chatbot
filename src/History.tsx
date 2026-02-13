import type {TAnswer, TQuestions} from "./types/TQuestions.ts";
import Question from "./Question";
import Answer from "./Answer";
import React from "react";

interface HistoryProps {
	history: TQuestions
	answers: Record<string, TAnswer>
}

export default function History(props: HistoryProps) {
	return Object.keys(props.history).map(k => {
		return <div className={"flex flex-col gap-2 w-full"} key={k}>
			<Question key={`${k}_question`} text={props.history[k].question} at={props.history[k].at}/>
			{ props.answers[k] && <Answer key={`${k}_answer`} text={props.answers[k].text} at={props.answers[k].at}/> }
		</div>
	});
}