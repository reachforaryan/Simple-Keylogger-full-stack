import React, { useState, useMemo } from 'react';

// Helper function to find related words
const findRelatedWords = (text, targetWord) => {
    if (!text || !targetWord) {
        return [];
    }

    const lines = text.split('\n');
    const targetWordLower = targetWord.toLowerCase();

    // 1. Find all lines containing the target word
    const relevantLines = lines.filter(line => line.toLowerCase().includes(targetWordLower));

    // 2. From those lines, collect all other words
    const coOccurringWords = {};
    relevantLines.forEach(line => {
        const words = line.trim().toLowerCase().split(/\s+/); // Split by whitespace
        words.forEach(word => {
            const cleanWord = word.replace(/[.,!?;:()]/g, ''); // Basic cleaning
            if (cleanWord && cleanWord !== targetWordLower) {
                coOccurringWords[cleanWord] = (coOccurringWords[cleanWord] || 0) + 1;
            }
        });
    });

    // 3. Sort by frequency
    const sortedWords = Object.entries(coOccurringWords)
        .sort(([, a], [, b]) => b - a);

    // 4. Return top 10
    return sortedWords.slice(0, 10).map(([word]) => word);
};

const TfIdfDashboard = ({ fileContent }) => {
    const [inputWord, setInputWord] = useState('');

    // useMemo will re-calculate related words only when fileContent or inputWord changes
    const relatedWords = useMemo(() => findRelatedWords(fileContent, inputWord), [fileContent, inputWord]);

    // Calculate character count
    const characterCount = useMemo(() => (fileContent ? fileContent.length : 0), [fileContent]);

    // Calculate word count
    const wordCount = useMemo(() => (fileContent ? fileContent.trim().split(/\s+/).filter(Boolean).length : 0), [fileContent]);

    // Calculate top keywords
    const topKeywords = useMemo(() => {
        if (!fileContent) {
            return [];
        }

        const stopWords = ['a', 'an', 'the', 'in', 'on', 'at', 'for', 'to', 'and', 'or', 'but', 'with', 'by', 'from', 'of', 'we', 'i', 'you', 'he', 'she', 'it', 'they', 'is', 'am', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'shall', 'may', 'can', 'could', 'would', 'should'];

        const cleanedContent = fileContent.replace(/\[.*?\]/g, '');
        const words = cleanedContent.trim().toLowerCase().split(/\s+/);
        const wordFrequencies = {};
        words.forEach(word => {
            const cleanWord = word.replace(/[.,!?;:()]/g, '');
            if (cleanWord && !stopWords.includes(cleanWord)) {
                wordFrequencies[cleanWord] = (wordFrequencies[cleanWord] || 0) + 1;
            }
        });
        const sortedKeywords = Object.entries(wordFrequencies)
            .sort(([, a], [, b]) => b - a);
        return sortedKeywords.slice(0, 10);
    }, [fileContent]);

    return (
        <div>
            <div>
                <h3>Text Statistics</h3>
                <p>Character Count: {characterCount}</p>
                <p>Word Count: {wordCount}</p>
                <h4>Top Keywords:</h4>
                {topKeywords.length > 0 ? (
                    <ul>
                        {topKeywords.map(([word, frequency], index) => (
                            <li key={index}>{word} ({frequency})</li>
                        ))}
                    </ul>
                ) : (
                    <p>No keywords found.</p>
                )}
            </div>
            <hr />
            <h3>Find Related Words</h3>
            <p>Enter a word to find the top 10 most frequently co-occurring words in the text.</p>
            <input
                type="text"
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value)}
                placeholder="Enter a word..."
                style={{ padding: '10px', width: '200px', marginBottom: '20px' }}
            />
            <div>
                <h4>Related Words:</h4>
                {relatedWords.length > 0 ? (
                    <ul>
                        {relatedWords.map((word, index) => (
                            <li key={index}>{word}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No related words found. Try another word or wait for more text content.</p>
                )}
            </div>
        </div>
    );
};

export default TfIdfDashboard;
