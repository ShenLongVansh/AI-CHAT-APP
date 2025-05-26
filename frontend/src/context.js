import React, { createContext, useContext, useRef, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const lastMsg = useRef();
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Hi there! I'm you AI assistant, I'm here to help you out with your questions. Ask me anything you want.",
    },
  ]);
  const [processing, setProcessing] = useState(false);

  const handleSubmission = async () => {
    if (!messageText.trim() || processing) return;

    const tempMessages = [
      ...messages,
      {
        from: "human",
        text: messageText,
      },
    ];

    setMessages(tempMessages);
    setMessageText("");

    setTimeout(() =>
      lastMsg.current.scrollIntoView({
        behavior: "smooth",
      })
    );

    try {
      setProcessing(true);
    
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          messages: tempMessages.slice(-8),
        }),
      });
    
      setProcessing(false);
    
      if (!res.ok) {
        const errorText = await res.text(); // Fallback if JSON is not returned
        console.error("Non-JSON error response:", errorText);
        throw new Error("Server error or invalid JSON");
      }
    
      const data = await res.json();
      const ans = data?.data;
    
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: ans?.trim() || "No response from server.",
        },
      ]);
    } catch (err) {
      console.error("Error:", err.message);
    
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: "Error processing your message. Please try again later.",
        },
      ]);
    }
    

    setTimeout(() =>
      lastMsg.current.scrollIntoView({
        behavior: "smooth",
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        lastMsg,
        messageText,
        setMessageText,
        processing,
        setProcessing,
        messages,
        setMessages,
        handleSubmission,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useGlobalContext = () => {
  return useContext(AppContext);
};
