import React, { useState, useEffect } from 'react';
import { Star, Trophy, Sparkles } from 'lucide-react';

const KidsCalculatorGame = () => {
    const [gameMode, setGameMode] = useState('calculator'); // 'calculator' or 'quiz'
    const [difficulty, setDifficulty] = useState('easy'); // 'easy', 'medium', 'hard'
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [question, setQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [display, setDisplay] = useState('0');
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operation, setOperation] = useState('+');

    const operations = [
        { symbol: '+', name: 'Addition', color: 'bg-green-400' },
        { symbol: '-', name: 'Subtraction', color: 'bg-blue-400' },
        { symbol: '×', name: 'Multiplication', color: 'bg-purple-400' },
        { symbol: '÷', name: 'Division', color: 'bg-pink-400' }
    ];

    const generateQuestion = () => {
        let ops, n1, n2, answer, randomOp;

        if (difficulty === 'easy') {
            // Easy: Addition and Subtraction with small numbers (1-20)
            ops = ['+', '-'];
            randomOp = ops[Math.floor(Math.random() * ops.length)];

            if (randomOp === '+') {
                n1 = Math.floor(Math.random() * 10) + 1;
                n2 = Math.floor(Math.random() * 10) + 1;
                answer = n1 + n2;
            } else {
                n1 = Math.floor(Math.random() * 15) + 6;
                n2 = Math.floor(Math.random() * n1);
                answer = n1 - n2;
            }
        } else if (difficulty === 'medium') {
            // Medium: All operations with medium numbers
            ops = ['+', '-', '×'];
            randomOp = ops[Math.floor(Math.random() * ops.length)];

            if (randomOp === '+') {
                n1 = Math.floor(Math.random() * 30) + 10;
                n2 = Math.floor(Math.random() * 30) + 10;
                answer = n1 + n2;
            } else if (randomOp === '-') {
                n1 = Math.floor(Math.random() * 40) + 20;
                n2 = Math.floor(Math.random() * 20) + 5;
                answer = n1 - n2;
            } else {
                n1 = Math.floor(Math.random() * 12) + 2;
                n2 = Math.floor(Math.random() * 12) + 2;
                answer = n1 * n2;
            }
        } else {
            // Hard: All operations including division with larger numbers
            ops = ['+', '-', '×', '÷'];
            randomOp = ops[Math.floor(Math.random() * ops.length)];

            if (randomOp === '+') {
                n1 = Math.floor(Math.random() * 80) + 20;
                n2 = Math.floor(Math.random() * 80) + 20;
                answer = n1 + n2;
            } else if (randomOp === '-') {
                n1 = Math.floor(Math.random() * 100) + 50;
                n2 = Math.floor(Math.random() * 50) + 10;
                answer = n1 - n2;
            } else if (randomOp === '×') {
                n1 = Math.floor(Math.random() * 20) + 5;
                n2 = Math.floor(Math.random() * 15) + 2;
                answer = n1 * n2;
            } else {
                // Division - ensure whole number results
                n2 = Math.floor(Math.random() * 10) + 2;
                answer = Math.floor(Math.random() * 20) + 5;
                n1 = n2 * answer;
            }
        }

        setQuestion({ n1, n2, op: randomOp, answer });
        setUserAnswer('');
        setFeedback(null);
    };

    const calculateResult = () => {
        const n1 = parseFloat(num1) || 0;
        const n2 = parseFloat(num2) || 0;
        let result;

        switch (operation) {
            case '+':
                result = n1 + n2;
                break;
            case '-':
                result = n1 - n2;
                break;
            case '×':
                result = n1 * n2;
                break;
            case '÷':
                result = n2 !== 0 ? n1 / n2 : 'Cannot divide by 0';
                break;
            default:
                result = 0;
        }

        setDisplay(result.toString());
    };

    const checkAnswer = () => {
        const answer = parseFloat(userAnswer);
        if (answer === question.answer) {
            setFeedback({ correct: true, message: '🎉 Awesome! Correct!' });
            setScore(score + 1);
            setStreak(streak + 1);
            setTimeout(() => generateQuestion(), 1500);
        } else {
            setFeedback({
                correct: false,
                message: `😊 Not quite! The answer is ${question.answer}. Try the next one!`
            });
            setStreak(0);
            setTimeout(() => generateQuestion(), 2000);
        }
    };

    useEffect(() => {
        if (gameMode === 'quiz') {
            generateQuestion();
        }
    }, [gameMode, difficulty]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-300 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-purple-700 mb-2 flex items-center justify-center gap-2">
                        <Sparkles className="text-yellow-500" />
                        Math Adventure Calculator
                        <Sparkles className="text-yellow-500" />
                    </h1>
                    <p className="text-purple-600 font-semibold">Lab Exercise 4 - Learn Math with Fun!</p>
                </div>

                {/* Score Display */}
                <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex justify-around items-center">
                    <div className="flex items-center gap-2">
                        <Trophy className="text-yellow-500" size={32} />
                        <div>
                            <p className="text-sm text-gray-600">Score</p>
                            <p className="text-2xl font-bold text-purple-600">{score}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Star className="text-orange-500" size={32} />
                        <div>
                            <p className="text-sm text-gray-600">Streak</p>
                            <p className="text-2xl font-bold text-orange-600">{streak}</p>
                        </div>
                    </div>
                </div>

                {/* Mode Selector */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setGameMode('calculator')}
                        className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${gameMode === 'calculator'
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        🧮 Calculator Mode
                    </button>
                    <button
                        onClick={() => setGameMode('quiz')}
                        className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${gameMode === 'quiz'
                                ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg scale-105'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        🎮 Quiz Mode
                    </button>
                </div>

                {/* Calculator Mode */}
                {gameMode === 'calculator' && (
                    <div className="bg-white rounded-xl shadow-2xl p-8">
                        <h2 className="text-2xl font-bold text-center mb-6 text-purple-600">
                            Practice Your Math!
                        </h2>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">First Number</label>
                                <input
                                    type="number"
                                    value={num1}
                                    onChange={(e) => setNum1(e.target.value)}
                                    className="w-full p-4 border-4 border-purple-300 rounded-lg text-2xl text-center font-bold focus:outline-none focus:border-purple-500"
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Second Number</label>
                                <input
                                    type="number"
                                    value={num2}
                                    onChange={(e) => setNum2(e.target.value)}
                                    className="w-full p-4 border-4 border-purple-300 rounded-lg text-2xl text-center font-bold focus:outline-none focus:border-purple-500"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700 mb-2 text-center">
                                Choose Operation
                            </label>
                            <div className="grid grid-cols-4 gap-3">
                                {operations.map((op) => (
                                    <button
                                        key={op.symbol}
                                        onClick={() => setOperation(op.symbol)}
                                        className={`py-4 rounded-lg font-bold text-2xl text-white transition-all ${operation === op.symbol
                                                ? `${op.color} scale-110 shadow-lg`
                                                : 'bg-gray-400 hover:bg-gray-500'
                                            }`}
                                    >
                                        {op.symbol}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={calculateResult}
                            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-4 rounded-lg font-bold text-xl hover:shadow-lg transition-all mb-4"
                        >
                            Calculate! ✨
                        </button>

                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg text-center">
                            <p className="text-gray-700 font-bold mb-2">Answer:</p>
                            <p className="text-5xl font-bold text-purple-600">{display}</p>
                        </div>
                    </div>
                )}

                {/* Quiz Mode */}
                {gameMode === 'quiz' && question && (
                    <div className="bg-white rounded-xl shadow-2xl p-8">
                        <h2 className="text-2xl font-bold text-center mb-4 text-green-600">
                            Solve the Problem!
                        </h2>

                        {/* Difficulty Selector */}
                        <div className="mb-6">
                            <p className="text-center font-semibold text-gray-700 mb-3">Choose Difficulty:</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setDifficulty('easy');
                                        setScore(0);
                                        setStreak(0);
                                    }}
                                    className={`flex-1 py-3 rounded-lg font-bold transition-all ${difficulty === 'easy'
                                            ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg scale-105'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    😊 Easy
                                    <div className="text-xs font-normal">(+, - up to 20)</div>
                                </button>
                                <button
                                    onClick={() => {
                                        setDifficulty('medium');
                                        setScore(0);
                                        setStreak(0);
                                    }}
                                    className={`flex-1 py-3 rounded-lg font-bold transition-all ${difficulty === 'medium'
                                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg scale-105'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    🤔 Medium
                                    <div className="text-xs font-normal">(+, -, × up to 50)</div>
                                </button>
                                <button
                                    onClick={() => {
                                        setDifficulty('hard');
                                        setScore(0);
                                        setStreak(0);
                                    }}
                                    className={`flex-1 py-3 rounded-lg font-bold transition-all ${difficulty === 'hard'
                                            ? 'bg-gradient-to-r from-red-400 to-purple-500 text-white shadow-lg scale-105'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    🔥 Hard
                                    <div className="text-xs font-normal">(All ops, big numbers)</div>
                                </button>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-xl mb-6 text-center">
                            <p className="text-5xl font-bold text-gray-800 mb-4">
                                {question.n1} {question.op} {question.n2} = ?
                            </p>
                        </div>

                        <input
                            type="number"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                            className="w-full p-4 border-4 border-green-300 rounded-lg text-3xl text-center font-bold focus:outline-none focus:border-green-500 mb-4"
                            placeholder="Your answer"
                            disabled={feedback !== null}
                        />

                        <button
                            onClick={checkAnswer}
                            disabled={!userAnswer || feedback !== null}
                            className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white py-4 rounded-lg font-bold text-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Check Answer! 🎯
                        </button>

                        {feedback && (
                            <div className={`mt-6 p-6 rounded-lg text-center text-xl font-bold ${feedback.correct
                                    ? 'bg-green-100 text-green-700 border-4 border-green-400'
                                    : 'bg-orange-100 text-orange-700 border-4 border-orange-400'
                                }`}>
                                {feedback.message}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default KidsCalculatorGame;
