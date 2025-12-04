import type {TAnswer} from "./types/TQuestions.ts";

interface AnswersProps {
	answers: TAnswer[];
	onClick: (answer: TAnswer) => void;
}

export default function Answers(props: AnswersProps) {
	return <div className={"self-end flex flex-row flex-wrap items-end gap-2 max-w-[284px]"}>
		{props.answers.map((el, i) => {
			return (
				<div className={"cursor-pointer bg-transparent rounded-lg px-4 py-2 border border-option text-option hover:text-option-hover hover:border-option-hover"} key={i} onClick={() => props.onClick(el)}>
					{el.text}
				</div>
			)
		})}
	</div>
}