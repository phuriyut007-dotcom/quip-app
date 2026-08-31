import { useContext, useState } from "react";
import { DataContext } from "../App";
import QuestionsData from "../data/QuestionsData";

const Quiz = () => {
    const { setAppState, setScore } = useContext(DataContext);
    const [current, setCurrent] = useState(0);

    // เก็บคำตอบของผู้ใช้แต่ละข้อไว้ใน Array
    const [answers, setAnswers] = useState(
        Array(QuestionsData.length).fill("")
    );

    // เลือกคำตอบ
    const selectChoice = (choice) => {
        const newAnswers = [...answers];
        newAnswers[current] = choice;
        setAnswers(newAnswers);
    };

    // ย้อนกลับ
    const previousQuestion = () => {
        if (current > 0) {
            setCurrent(current - 1);
        }
    };

    // ไปข้อถัดไป
    const nextQuestion = () => {
        if (current < QuestionsData.length - 1) {
            setCurrent(current + 1);
        }
    };

    // ตรวจคำตอบทั้งหมดและส่งคะแนน
    const submitQuiz = () => {
        let totalScore = 0;
        for (let i = 0; i < QuestionsData.length; i++) {
            if (answers[i] === QuestionsData[i].answer) {
                totalScore++;
            }
        }
        setScore(totalScore);
        setAppState("score");
    };

    return (
        <div className="quiz">
            <h2>{QuestionsData[current].question}</h2>

            <div className="choices">
                <button
                    className={answers[current] === "A" ? "selected" : ""}
                    onClick={() => selectChoice("A")}
                >
                    {QuestionsData[current].A}
                </button>

                <button
                    className={answers[current] === "B" ? "selected" : ""}
                    onClick={() => selectChoice("B")}
                >
                    {QuestionsData[current].B}
                </button>

                <button
                    className={answers[current] === "C" ? "selected" : ""}
                    onClick={() => selectChoice("C")}
                >
                    {QuestionsData[current].C}
                </button>

                <button
                    className={answers[current] === "D" ? "selected" : ""}
                    onClick={() => selectChoice("D")}
                >
                    {QuestionsData[current].D}
                </button>
            </div>

            <p>
                {current + 1} / {QuestionsData.length}
            </p>

            <div className="navigation">
                <button 
                    onClick={previousQuestion} 
                    disabled={current === 0}
                >
                    ย้อนกลับ
                </button>

                {current === QuestionsData.length - 1 ? (
                    <button 
                        onClick={submitQuiz} 
                        disabled={answers[current] === ""}
                    >
                        ส่งคำตอบ
                    </button>
                ) : (
                    <button 
                        onClick={nextQuestion} 
                        disabled={answers[current] === ""}
                    >
                        ถัดไป
                    </button>
                )}
            </div>
        </div>
    );
};

export default Quiz;