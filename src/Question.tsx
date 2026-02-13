import React from "react";

interface QuestionProps {
	text: string | string[];
	at?: string;
}

export default function Question(props: QuestionProps) {
	if(typeof props.text === "string") return (
		<div className={"min-h-8 bg-question text-question-text rounded-lg px-4 py-2 self-start whitespace-pre-wrap h-auto"}>
			<p>{props.text}</p>
			<p className={"text-xs"}>{props.at}</p>
		</div>
	)
	return (props.text as string[]).map((el, i) => <Question text={el} key={i}/>);
}