const questions = [

    {
        question: "What is the capital of France?",
        option: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correctAnswer: "Paris"
    },
    {
        question: "Do you like JS?",
        options: ["Yes", "No"],
        correctAnswer: "No"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Venus", "Jupiter", "Saturn", "Neptune"],
        correctAnswer: "Jupiter"
    },
    {
        question: "Which programming language is known for web development?",
        options: ["Python", "C++", "JavaScript", "Java"],
        correctAnswer: "JavaScript"
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        correctAnswer: "2"
    },
    {
        question: "Who wrote Romeo and Juliet?",
        options: ["Jane Austen", "William Shakespeare", "Mark Twain", "Charles Dickens"],
        correctAnswer: "William Shakespeare"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: "Au"
    },
    {
        question: "In which year did the Titanic sink?",
        options: ["1912", "1920", "1905", "1898"],
        correctAnswer: "1912"
    },
    {
        question: "What is the fastest land animal?",
        options: ["Lion", "Cheetah", "Gazelle", "Greyhound"],
        correctAnswer: "Cheetah"
    },
    {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "7"
    },
    {
        question: "What is the most spoken language in the world?",
        options: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
        correctAnswer: "Mandarin Chinese"
    }

];



const assets = [
    {
        value: "💎",
        description: "You are getting an extra Star"
    },
    {
        value: "🐻",
        description: "The scary bear takes away your one Star"
    },
    {
        value: "❌",
        description: "Game OVER!!!"
    }
];



export function generateData(min, max) {
    const totalTiles = Math.floor(Math.random() * (max - min + 1)) + min;

    // Keep assets unique (max one of each) and ensure at least one question tile.
    const maxUniqueAssets = assets.length;
    const desiredAssetCount = Math.min(3, maxUniqueAssets, Math.max(0, totalTiles - 1));
    const questionCount = Math.max(1, totalTiles - desiredAssetCount);

    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    const shuffledAssets = [...assets].sort(() => Math.random() - 0.5);

    const selectedQuestions = shuffledQuestions.slice(0, questionCount);
    const selectedAssets = shuffledAssets.slice(0, desiredAssetCount);

    const tileSet = [...selectedQuestions, ...selectedAssets];
    tileSet.sort(() => Math.random() - 0.5);

    return tileSet;
}

