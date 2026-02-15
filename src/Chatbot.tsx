import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import type {TAnswer, TQuestion, TQuestions} from "./types/TQuestions.ts";
import Question from "./Question";
import Answers from "./Answers";
import History from "./History";
import Input from "./Input";
import {currentTime} from "./utils";
import useChatbot from "./hooks/useChatbot";
import type TConfig from "./types/TConfig.ts";
import React from "react";

interface ChatbotProps {
	config?: TConfig;
}

export default function Chatbot(props: ChatbotProps) {
	const config = useChatbot(props.config);
	const [data, setData] = useState<Record<string, any>>({});
	const [chatbot, setChatbot] = useState<TQuestions>(config.bot.questions);
	const [currentQuestion, setCurrentQuestion] = useState<TQuestion | null>(null);
	const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
	const [history, setHistory] = useState<TQuestions>({});
	const [answers, setAnswers] = useState<Record<string, TAnswer>>({});
	const [end, setEnd] = useState<boolean>(false);
	const container = useRef<HTMLDivElement>(null);
	const audio = useMemo(() => {
		return new Audio("/notification.mp3");
	}, []);
	const clickAnswer = useCallback((answer: TAnswer) => {
		if(answer.next && currentQuestion) {
			answer.at = currentTime();
			setHistory(prev => ({...prev, [currentQuestionId!]: currentQuestion!}));
			setCurrentQuestionId(answer.next);
			setCurrentQuestion(chatbot[answer.next]);
			setAnswers(prev => ({...prev, [currentQuestionId!]: answer}));
			if(answer.action) {
				if(answer.action.action === "set") {
					setData(prev => ({ ...prev, [answer.action!.property!]: answer.action?.value }))
				}
			}
		}
	}, [currentQuestion, chatbot, currentQuestionId]);
	const sendAnswer = useCallback((input: string) => {
		if(currentQuestion && currentQuestion.action && currentQuestion.action.property) {
			const prop = currentQuestion.action.property;
			setData(prev => ({ ...prev, [prop]: input}));
			setHistory(prev => ({...prev, [currentQuestionId!]: currentQuestion!}));
			setCurrentQuestionId(currentQuestion.action.goto!);
			setCurrentQuestion(chatbot[currentQuestion.action.goto!]);
			setAnswers(prev => ({...prev, [currentQuestionId!]: {text: input, at: currentTime()}}));
		}
	}, [currentQuestion, currentQuestionId, chatbot]);
	useEffect(() => {
		setChatbot(config.bot.questions);
	}, [config]);
	useEffect(() => {
		if(chatbot["start"] !== undefined) {
			setCurrentQuestion(chatbot["start"]);
			setCurrentQuestionId("start");
		}
	}, [chatbot]);
	useEffect(() => {
		container?.current?.scrollBy(0, 500);
		if(currentQuestion && currentQuestion.at === undefined) {
			setCurrentQuestion(prev => ({ ...prev!, at: currentTime()}))
			currentQuestion.at = currentTime();
		}
		if(currentQuestion && currentQuestion.goto) {
			const next = currentQuestion.goto;
			setTimeout(() => {
				setHistory(prev => ({...prev, [currentQuestionId!]: currentQuestion!}));
				setCurrentQuestionId(next);
				setCurrentQuestion(chatbot[next]);
			}, 2500)
		}
	}, [currentQuestion, chatbot, currentQuestionId]);
	useEffect(() => {
		if(currentQuestion && currentQuestion.action) {
			if(currentQuestion.action.property && currentQuestion.action.action === "set") {
				setData(prev => ({ ...prev, [currentQuestion.action!.property!]: currentQuestion.action?.value }));
			}
		}
	}, [config, currentQuestion]);
	useEffect(() => {
		if(currentQuestion && currentQuestion.action && currentQuestion.action.action === "end") {
			setEnd(true);
			if(config.onEnd) {
				config.onEnd(data);
			}
		}
	}, [config, currentQuestion, data]);
	useEffect(() => {
		if(currentQuestionId !== "start") {
			audio.play();
		}
	}, [currentQuestionId, audio]);
	return (
		<div className={"h-[700px] flex flex-col overflow-hidden bg-background rounded-2xl absolute w-[416px] -top-[720px] -left-[356px]"}>
			<header className={"bg-primary"}>
				<nav className={"flex items-center h-full p-4 flex-col text-onprimary"}>
					<div className={"flex w-full"}>
						{/*<button aria-label={"Afficher la liste des fils, 0 fils non lus"}>*/}
						{/*	<img src={back}/>*/}
						{/*</button>*/}
					</div>
					<p className={"font-bold text-xl"}>{config.bot.name}</p>
				</nav>
			</header>
			<div className={"flex flex-col items-start gap-2 overflow-y-auto grow pb-8 px-4 pt-4 scroll-smooth"} ref={container}>
				<History history={history} answers={answers}/>
				{ currentQuestion && <div className={"flex flex-col gap-2 w-full"}><Question text={currentQuestion.question} at={currentQuestion.at}/></div> }
				{ currentQuestion && currentQuestion.answers && <Answers answers={currentQuestion.answers} onClick={clickAnswer}/> }
				{ end && <div className={"w-full text-center"}>
					<p className={"text-question-text"}>{config.endMessage ?? "Votre chat est terminé" }</p>
					<a className={"text-primary transition hover:underline hover:text-primary-dark cursor-pointer"} onClick={() => {
						setCurrentQuestion(chatbot["start"]);
						setCurrentQuestionId("start");
						setHistory({});
						setAnswers({});
						setEnd(false);
					}}>{config.endButtonText ?? "Pour commencer un nouveau chat, cliquez ici."}</a>
				</div>}
			</div>
			<footer className={"w-full p-4 bg-transparent"}>
				<Input disabled={currentQuestion?.action?.action !== "ask"} onSend={sendAnswer}/>
			</footer>
		</div>
	)
}