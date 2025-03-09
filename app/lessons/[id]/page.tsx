"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getLessonById, Lesson, Question } from "../../firebase/lessons";
import { getIconByName } from "../../utils/iconMapping";
import styles from "./lessonDetail.module.css";
import { ArrowLeft, Lock } from "lucide-react";

export default function LessonDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<number>(0);
    const [quizMode, setQuizMode] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

    useEffect(() => {
        const fetchLesson = async () => {
            if (!params.id || typeof params.id !== 'string') {
                setError("ID de leçon invalide");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const lessonData = await getLessonById(params.id);
                
                if (!lessonData) {
                    setError("Leçon non trouvée");
                    setLoading(false);
                    return;
                }
                
                if (lessonData.locked) {
                    setError("Cette leçon est verrouillée");
                    setLoading(false);
                    return;
                }
                
                setLesson(lessonData);
                setLoading(false);
            } catch (err) {
                console.error("Erreur lors du chargement de la leçon:", err);
                setError("Impossible de charger la leçon. Veuillez réessayer plus tard.");
                setLoading(false);
            }
        };

        fetchLesson();
    }, [params.id]);

    const handleSectionChange = (index: number) => {
        setActiveSection(index);
        setQuizMode(false);
    };

    const startQuiz = () => {
        setQuizMode(true);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setScore(0);
        setQuizCompleted(false);
    };

    const handleAnswerSelect = (answerIndex: number) => {
        if (showExplanation) return;
        setSelectedAnswer(answerIndex);
    };

    const checkAnswer = () => {
        if (selectedAnswer === null || !lesson?.content?.questions) return;
        
        const currentQuestionData = lesson.content.questions[currentQuestion];
        if (selectedAnswer === currentQuestionData.correctAnswer) {
            setScore(score + 1);
        }
        
        setShowExplanation(true);
    };

    const nextQuestion = () => {
        if (!lesson?.content?.questions) return;
        
        if (currentQuestion < lesson.content.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            setQuizCompleted(true);
        }
    };

    const goBack = () => {
        router.push('/lessons');
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Chargement de la leçon...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.errorMessage}>{error}</p>
                <button className={styles.backButton} onClick={goBack}>
                    <ArrowLeft size={16} />
                    Retour aux leçons
                </button>
            </div>
        );
    }

    if (!lesson || !lesson.content) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.errorMessage}>Contenu de la leçon non disponible</p>
                <button className={styles.backButton} onClick={goBack}>
                    <ArrowLeft size={16} />
                    Retour aux leçons
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={goBack}>
                    <ArrowLeft size={16} />
                    Retour aux leçons
                </button>
                <div className={styles.lessonInfo}>
                    <div className={styles.categoryTag}>
                        {getIconByName(lesson.iconName)}
                        <span>{lesson.category}</span>
                    </div>
                    <h1 className={styles.title}>{lesson.title}</h1>
                    <p className={styles.description}>{lesson.description}</p>
                    <div className={styles.tagsContainer}>
                        {lesson.tags && lesson.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.contentContainer}>
                <div className={styles.sidebar}>
                    <div className={styles.sectionLinks}>
                        {lesson.content.sections.map((section, index) => (
                            <button
                                key={index}
                                className={`${styles.sectionLink} ${activeSection === index && !quizMode ? styles.active : ''}`}
                                onClick={() => handleSectionChange(index)}
                            >
                                {section.title}
                            </button>
                        ))}
                        {lesson.content.questions && lesson.content.questions.length > 0 && (
                            <button
                                className={`${styles.sectionLink} ${styles.quizLink} ${quizMode ? styles.active : ''}`}
                                onClick={startQuiz}
                            >
                                Quiz
                            </button>
                        )}
                    </div>
                </div>

                <div className={styles.mainContent}>
                    {!quizMode ? (
                        <div className={styles.sectionContent}>
                            <h2 className={styles.sectionTitle}>
                                {lesson.content.sections[activeSection].title}
                            </h2>
                            <div 
                                className={styles.sectionText}
                                dangerouslySetInnerHTML={{ 
                                    __html: lesson.content.sections[activeSection].content 
                                }}
                            />
                            <div className={styles.navigationButtons}>
                                <button
                                    className={styles.navButton}
                                    disabled={activeSection === 0}
                                    onClick={() => handleSectionChange(activeSection - 1)}
                                >
                                    Section précédente
                                </button>
                                <button
                                    className={styles.navButton}
                                    disabled={activeSection === lesson.content.sections.length - 1}
                                    onClick={() => handleSectionChange(activeSection + 1)}
                                >
                                    Section suivante
                                </button>
                                {activeSection === lesson.content.sections.length - 1 && 
                                 lesson.content.questions && 
                                 lesson.content.questions.length > 0 && (
                                    <button
                                        className={`${styles.navButton} ${styles.quizButton}`}
                                        onClick={startQuiz}
                                    >
                                        Commencer le quiz
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className={styles.quizContainer}>
                            {!quizCompleted && lesson.content.questions && lesson.content.questions.length > 0 ? (
                                <>
                                    <h2 className={styles.quizTitle}>Quiz - Question {currentQuestion + 1}/{lesson.content.questions.length}</h2>
                                    <div className={styles.questionCard}>
                                        <p className={styles.questionText}>{lesson.content.questions[currentQuestion].text}</p>
                                        <div className={styles.answerOptions}>
                                            {lesson.content.questions[currentQuestion].options.map((option, index) => (
                                                <button
                                                    key={index}
                                                    className={`${styles.answerOption} ${
                                                        selectedAnswer === index ? styles.selected : ''
                                                    } ${
                                                        showExplanation && lesson.content && lesson.content.questions && 
                                                        index === lesson.content.questions[currentQuestion].correctAnswer
                                                            ? styles.correct
                                                            : showExplanation && selectedAnswer === index
                                                            ? styles.incorrect
                                                            : ''
                                                    }`}
                                                    onClick={() => handleAnswerSelect(index)}
                                                    disabled={showExplanation}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                        {showExplanation && (
                                            <div className={styles.explanation}>
                                                <h3>Explication :</h3>
                                                <p>{lesson.content.questions[currentQuestion].explanation}</p>
                                            </div>
                                        )}
                                        <div className={styles.quizActions}>
                                            {!showExplanation ? (
                                                <button
                                                    className={styles.checkButton}
                                                    onClick={checkAnswer}
                                                    disabled={selectedAnswer === null}
                                                >
                                                    Vérifier
                                                </button>
                                            ) : (
                                                <button
                                                    className={styles.nextButton}
                                                    onClick={nextQuestion}
                                                >
                                                    {currentQuestion < lesson.content.questions.length - 1
                                                        ? 'Question suivante'
                                                        : 'Voir les résultats'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className={styles.quizResults}>
                                    <h2 className={styles.resultsTitle}>Résultats du Quiz</h2>
                                    <div className={styles.scoreCard}>
                                        <p className={styles.scoreText}>
                                            Votre score : <span className={styles.score}>{score}/{lesson.content.questions ? lesson.content.questions.length : 0}</span>
                                        </p>
                                        <p className={styles.scorePercentage}>
                                            {lesson.content.questions && lesson.content.questions.length > 0 
                                                ? Math.round((score / lesson.content.questions.length) * 100)
                                                : 0}%
                                        </p>
                                        {lesson.content.questions && (
                                            <>
                                                {score === lesson.content.questions.length ? (
                                                    <p className={styles.congratsMessage}>Félicitations ! Vous avez répondu correctement à toutes les questions.</p>
                                                ) : score >= lesson.content.questions.length / 2 ? (
                                                    <p className={styles.goodMessage}>Bon travail ! Vous avez réussi le quiz.</p>
                                                ) : (
                                                    <p className={styles.tryAgainMessage}>Vous pouvez faire mieux. Révisez la leçon et réessayez.</p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <div className={styles.resultActions}>
                                        <button
                                            className={styles.retryButton}
                                            onClick={startQuiz}
                                        >
                                            Réessayer le quiz
                                        </button>
                                        <button
                                            className={styles.backToLessonButton}
                                            onClick={() => handleSectionChange(0)}
                                        >
                                            Retour à la leçon
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 