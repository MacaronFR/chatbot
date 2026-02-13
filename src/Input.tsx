import React from "react";
import Send from "./Send";
import {useEffect, useState} from "react";

interface InputProps {
	disabled?: boolean;
	onSend?: (input: string) => void;
}

export default function Input(props: InputProps) {
	const [value, setValue] = useState("");
	useEffect(() => {
		if(props.disabled) {
			setValue("");
		}
	}, [setValue, props.disabled]);
	return <div className={"border border-input rounded-full px-4 py-2 flex justify-between text-input"}>
		<input type={"text"} className={"focus:outline-none grow"} value={value} onChange={e => setValue(e.target.value)} disabled={props.disabled} onKeyDown={e => {
			if(e.key === "Enter") {
				props.onSend?.(value)
				setValue("");
			}
		}}/>
		<button className={"cursor-pointer text-input disabled:cursor-not-allowed disabled:text-input-disabled"} disabled={value.length === 0 || props.disabled} onClick={() => {
			props.onSend?.(value)
			setValue("");
		}}>
			<Send/>
		</button>
	</div>
}