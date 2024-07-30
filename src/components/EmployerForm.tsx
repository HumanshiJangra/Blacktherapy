import React, { useState } from "react";

interface EmployerFormProps {
  onBack: () => void;
}

const employerQuestions = [
  { question: "Organization name", type: "text", placeholder: "Enter name" },
  { question: "Email", type: "text", placeholder: "Email" },
  {
    question: "To begin, tell us why you're looking for help today.",
    type: "radio",
    options: [
      "I'm feeling anxious or panicky",
      "I'm having difficulty in my relationship",
      "A traumatic experience [past or present]",
      "I'm navigating addiction or difficulty with substance abuse",
      "I'm feeling down or depressed.",
      "I'm dealing with stress at work or school",
      "Something else",
    ],
  },
  {
    question: "How would you rate your sleeping habits?",
    type: "radio",
    options: ["Excellent", "Good", "Fair", "Poor"],
  },
  {
    question: "How would you rate your current physical health?",
    type: "radio",
    options: ["Excellent", "Good", "Fair", "Poor"],
  },
  {
    question: "How did you here about us?",
    type: "radio",
    options: [
      "My doctor",
      "Serach Engine/Online",
      "Insurance provider",
      "Previous therapist",
      "Court",
      "Friend/Family",
      "Community Organization",
      "Media/Ad",
    ],
  },
  {
    question: "What gender do you identify with?",
    type: "radio",
    options: [
      "Male",
      "Female",
      "Transgender female",
      "Transgender male",
      "Gender queer",
      "Gender variant",
      "other",
      "Non Binary",
    ],
  },
  {
    question: "Briefly describe the main issues or concerns that bring you to therapy?",
    type: "textarea",
    placeholder: "",
  },
  // Add more questions as needed
];

const EmployerForm: React.FC<EmployerFormProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);

  const handleAnswerChange = (answer: any, index: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const renderQuestions = () => {
    let startIndex = 0;
    let endIndex = 0;

    if (currentStep === 0) {
      startIndex = 0;
      endIndex = 2; // Show first 2 questions
    } else if (currentStep === 1) {
      startIndex = 2;
      endIndex = 4; // Show next 2 questions
    } else if (currentStep === 2) {
      startIndex = 4;
      endIndex = 6; // Show next 2 questions
    } else if (currentStep === 3) {
      startIndex = 6;
      endIndex = 8; // Show remaining questions
    }

    return employerQuestions.slice(startIndex, endIndex).map((question, index) => (
      <div key={index + startIndex} className="mb-4">
        <label>{question.question}</label>
        {question.type === "textarea" ? (
          <textarea
            placeholder={question.placeholder}
            className="input"
            value={answers[index + startIndex] || ""}
            onChange={(e) => handleAnswerChange(e.target.value, index + startIndex)}
          />
        ) : question.type === "select" ? (
          <select
            className="input"
            value={answers[index + startIndex] || ""}
            onChange={(e) => handleAnswerChange(e.target.value, index + startIndex)}
          >
            <option value="">Select an option</option>
            {question.options?.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
        ) : question.type === "radio" ? (
          <div className="flex flex-col">
            {question.options?.map((option, i) => (
              <label key={i} className="flex items-center mb-2">
                <input
                  type="radio"
                  name={`radio_${index + startIndex}`}
                  value={option}
                  checked={answers[index + startIndex] === option}
                  onChange={() => handleAnswerChange(option, index + startIndex)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        ) : question.type === "checkbox" ? (
          <div className="flex flex-col">
            {question.options?.map((option, i) => (
              <label key={i} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={option}
                  checked={answers[index + startIndex]?.includes(option)}
                  onChange={(e) => {
                    const selectedOptions = answers[index + startIndex] || [];
                    if (e.target.checked) {
                      handleAnswerChange([...selectedOptions, option], index + startIndex);
                    } else {
                      handleAnswerChange(selectedOptions.filter((item: string) => item !== option), index + startIndex);
                    }
                  }}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        ) : (
          <input
            type={question.type}
            placeholder={question.placeholder}
            className="input"
            value={answers[index + startIndex] || ""}
            onChange={(e) => handleAnswerChange(e.target.value, index + startIndex)}
          />
        )}
      </div>
    ));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Enter organization Detail</h2>
      {renderQuestions()}

      <div className="flex justify-between">
        <button onClick={handleBack} className="btn btn-secondary">Back</button>
        {currentStep < Math.ceil(employerQuestions.length / 3) && (
          <button onClick={handleContinue} className="btn btn-primary">Continue</button>
        )}
      </div>
    </div>
  );
};

export default EmployerForm;
