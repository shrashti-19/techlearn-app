import { useState } from 'react';

const FloatingCodeWords = () => {
  const [hoveredWord, setHoveredWord] = useState(null);

  const floatingWords = [
    "#include", "console.log", "parseInt", "await", "System.out.println",
    "malloc", "dev-tools", "async", "package.json",
    "useState", "useEffect", "npm install", "git commit", "docker run",
    "SELECT *", "import React", "function", "const", "let",
    "return", "if", "else", "for", "while",
    "try", "catch", "throw", "new", "class",
    "extends", "super", "this", "null", "undefined",
    "true", "false",
  ];

  return (
    <>
      {floatingWords.map((word, index) => (
        <span
          key={index}
          className={`absolute text-gray-400 text-sm select-none cursor-pointer 
                      transition-all duration-300
                      ${hoveredWord === index ? 
                        '!text-gray-700 !scale-125 !font-semibold animate-none' : 
                        hoveredWord !== null ? 'animate-slow-fall' : 'animate-fall'}`}
          style={{
            left: `${5 + Math.random() * 90}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            animationTimingFunction: 'linear',
            opacity: 0.7,
            transform: hoveredWord === index ? 'scale(1.25)' : 'none',
            zIndex: hoveredWord === index ? 20 : 10
          }}
          onMouseEnter={() => setHoveredWord(index)}
          onMouseLeave={() => setHoveredWord(null)}
        >
          {word}
        </span>
      ))}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100px);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(calc(100vh + 20px));
            opacity: 0;
          }
        }
        
        @keyframes slow-fall {
          0% {
            transform: translateY(-100px);
            opacity: 0.5;
          }
          100% {
            transform: translateY(calc(100vh + 20px));
            opacity: 0.5;
          }
        }
        
        .animate-fall {
          animation: fall linear infinite;
        }
        
        .animate-slow-fall {
          animation: slow-fall linear infinite;
          animation-duration: 20s !important;
          opacity: 0.5;
        }
      `}</style>
    </>
  );
};

export default FloatingCodeWords;