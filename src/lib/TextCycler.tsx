import { useEffect, useState } from "react";

interface TextCyclerProps {
  words: string[];
  interval?: number;
  className?: string;
  typingSpeed?: number;
  eraseSpeed?: number;
  delayAfterComplete?: number;
}

const TextCycler = ({
  words,
  interval = 2000,
  className = "",
  typingSpeed = 100,
  eraseSpeed = 50,
  delayAfterComplete = 1500,
}: TextCyclerProps) => {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const currentWord = words[wordIndex % words.length];

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTyping) {
      // Typing phase
      if (displayText.length < currentWord.length) {
        // Still characters left to type
        timer = setTimeout(() => {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Word complete - pause before erasing
        timer = setTimeout(() => {
          setIsTyping(false);
          setIsDeleting(true);
        }, delayAfterComplete);
      }
    } else if (isDeleting) {
      // Deleting phase
      if (displayText.length > 0) {
        // Still characters left to delete
        timer = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, eraseSpeed);
      } else {
        // Word fully deleted - move to next word
        setIsDeleting(false);
        setIsTyping(true);
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [
    currentWord,
    displayText,
    isTyping,
    isDeleting,
    words,
    wordIndex,
    typingSpeed,
    eraseSpeed,
    delayAfterComplete,
  ]);

  return (
    <div
      className={`inline-block relative ${className}`}
      style={{ minWidth: "100px" }}
    >
      <span className="text-left block">{displayText}</span>
      <span
        className="absolute inline-block w-[2px] h-[1.2em] bg-clan-gold animate-blink"
        style={{
          left: `${displayText.length * 0.6}em`,
          top: "50%",
          transform: "translateY(-50%)",
        }}
        aria-hidden="true"
      ></span>
    </div>
  );
};

export default TextCycler;
