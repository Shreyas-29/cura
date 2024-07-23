"use client";

import { createMessages } from "@/actions";
import ai from "@/lib/google";
import { generatePrompt } from "@/utils";
import { Medication, Message, Symptom, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { BotIcon, LoaderIcon, SendIcon, TriangleAlertIcon } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
    user: User;
    symptoms: Symptom[];
    medications: Medication[];
    messages: Message[];
}

const ChatBox = ({ user, symptoms, medications, messages }: Props) => {

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [input, setInput] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [msgs, setMsgs] = useState<Message[]>(messages || []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [msgs]);

    const { mutate: createUserMessage } = useMutation({
        mutationKey: ["create-user-messages"],
        mutationFn: async (message: string) => createMessages({ role: "user", message: message }),
    });

    const { mutate: createBotMessage } = useMutation({
        mutationKey: ["create-bot-messages"],
        mutationFn: async (message: string) => createMessages({ role: "model", message: message }),
    });

    // const handleSendMessage = async (e: FormEvent) => {
    //     e.preventDefault();

    //     if (!input.trim()) return;

    //     const newMessages = [...msgs];
    //     setMsgs(newMessages);
    //     setInput("");
    //     setIsLoading(true);

    //     console.log("starting")

    //     try {
    //         const model = ai.getGenerativeModel({
    //             model: "gemini-1.5-flash"
    //         });

    //         const prompt = newMessages.map(message => `${message.role === "USER" ? "User" : "Assistant"}: ${message.content}`).join("\n");
    //         const result = await model.generateContent(prompt);
    //         const res = await result.response;

    //         const botMessage = { role: "MODEL", content: res.text() };

    //         createUserMessage(input);
    //         console.log("created user message")
    //         createBotMessage(botMessage.content);
    //         console.log("created bot message")

    //         setMsgs([...newMessages!, { role: "MODEL", content: res.text() }]);
    //     } catch (error) {
    //         console.log("Error generating response:", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();

        if (!input.trim()) return;

        const newMessages = [...msgs, { role: "user", content: input }];
        // @ts-ignore
        setMsgs(newMessages);
        setInput("");
        setIsLoading(true);

        try {
            const model = ai.getGenerativeModel({
                model: "gemini-1.5-flash"
            });

            const promptText = generatePrompt({ symptoms, medications, user });
            console.log(promptText);

            const chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: promptText }],
                    },
                ],
                ...newMessages.map((message) => ({
                    role: message.role,
                    parts: [{ text: message.content }],
                })),
                generationConfig: {
                    maxOutputTokens: 200,
                },
                systemInstruction: {
                    role: "model",
                    parts: [{
                        text: promptText,
                    }],
                }
            });

            const result = await chat.sendMessage(input);
            const response = result.response;
            const botMessageContent = response.text();

            const botMessage = { role: "model", content: botMessageContent };

            createUserMessage(input);
            createBotMessage(botMessage.content);

            // @ts-ignore
            setMsgs((prev) => [...prev, botMessage]);
        } catch (error) {
            setError("Error generating response");
            console.log("Error generating response:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (messages) {
            setMsgs(messages);
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-full w-full relative">
            <div className="flex flex-col md:border rounded-xl h-full w-full">
                <div className="w-full h-full overflow-y-scroll space-y-4 md:p-4 flex flex-col flex-1 scrollbar-hide">
                    <div className="absolute top-0 md:top-px inset-x-0 md:inset-x- w-full md:w-[calc(100%-4px)] mx-auto h-10 bg-gradient-to-b from-background rounded-t-none md:rounded-t-xl"></div>
                    {!isLoading && error && (
                        <div className="flex items-center justify-center w-full py-8 h-full">
                            <p className="text-sm text-red-500 bg-red-50 px-4 py-1.5 rounded-md mx-auto font-medium flex items-center">
                                <TriangleAlertIcon className="w-4 h-4 mr-2" />
                                {error}
                            </p>
                        </div>
                    )}
                    {!isLoading && !error && msgs?.length === 0 && (
                        <div className="flex flex-col items-center justify-center w-full py-8 h-full">
                            <BotIcon className="w-10 h-10 text-primary" />
                            <p className="text-sm text-muted-foreground font-medium mt-2">
                                Start a conversation with your personal assistant
                            </p>
                        </div>
                    )}
                    {msgs?.map((message, index) => (
                        <div
                            key={index}
                            className={`flex max-w-lg ${message.role === "user" ? "text-right ml-auto" : "text-left mr-auto"}`}
                        >
                            {message.role === "user" ? (
                                <div className="flex items-end">
                                    <p className="bg-primary text-white text-sm px-4 py-2 rounded-lg">
                                        {message.content}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex items-start">
                                    <div className="bg-neutral-100 text-foreground text-sm px-4 py-2 rounded-lg">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]} className="whitespace-pre-line">
                                            {message.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex flex-col justify-center items-center p-4">
                            <LoaderIcon className="w-5 h-5 animate-spin" />
                            <p className="text-sm text-muted-foreground font-medium">
                                Assistant is thinking...
                            </p>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="w-full rounded-xl sticky bottom-0 inset-x-0">
                    <form onSubmit={handleSendMessage} className="flex gap-4 rounded-xl py-3 md:px-3">
                        <Input
                            type="text"
                            value={input}
                            disabled={isLoading}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about your health..."
                            className="flex-grow focus-visible:ring-0 focus-visible:ring-transparent border"
                        />
                        <Button
                            size="iconlg"
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className=""
                        >
                            {isLoading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <SendIcon className="w-5 h-5" />}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default ChatBox
