declare module 'react-highlight-words' {
    import React from 'react';

    interface HighlightWordsProps {
        searchWords: string[];
        textToHighlight: string;
        autoEscape?: boolean;
        caseSensitive?: boolean;
        highlightClassName?: string;
        highlightStyle?: React.CSSProperties;
        sanitize?: (text: string) => string;
        findChunks?: (options: {
            searchWords: string[];
            textToHighlight: string;
        }) => { start: number; end: number }[];
        onMouseOverHighlight?: (event: React.MouseEvent<HTMLSpanElement>) => void;
        onMouseOutHighlight?: (event: React.MouseEvent<HTMLSpanElement>) => void;
    }

    const Highlight: React.FC<HighlightWordsProps>;
    export default Highlight;
}
