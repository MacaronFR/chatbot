import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import Chatbot from "./Chatbot";
import React from "react";

createRoot(document.getElementById('chatbot_root')!).render(
	<StrictMode>
		<Chatbot/>
	</StrictMode>,
)
