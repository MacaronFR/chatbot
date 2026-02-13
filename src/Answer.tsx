import React from "react";

interface AnswerProps {
	text: string;
	at?: string;
}

export default function Answer(props: AnswerProps) {
	return <div className={"bg-primary rounded-lg px-4 py-2 self-end text-onprimary"}>
		<p>{props.text}</p>
		<p className={"w-full text-end text-xs"}>{props.at}</p>
	</div>
}