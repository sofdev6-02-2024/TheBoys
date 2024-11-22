"use client";

interface RoutineButtonProps {
    buttonText: string;
    description: string;
    onClick?: () => void;
}
  
export const RoutineButton = ({ 
    buttonText, 
    description, 
    onClick 
}: RoutineButtonProps) => {
    return (
      <article 
        className="bg-black rounded-lg p-6 text-white hover:shadow-glow transition-all cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            if (onClick) {
              onClick();
            }
          }
        }}        
        aria-label={buttonText}
      >
        <header>
          <h2 className="text-xl font-bold mb-2">{buttonText}</h2>
        </header>
        <p className="text-gray-300">{description}</p>
      </article>
    );
};
  
export default RoutineButton;
