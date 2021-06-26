import { ReactNode } from 'react';

import cl from 'classnames'

import '../styles/question.scss'

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: ReactNode;
    isHighlighted?: ReactNode;
}
/* export function Question(props: QuestionProps) {
    return ( <p>{props.content}</p> );
*or destructure props:
    */
export function Question({ 
    content, 
    author, 
    children, 
    isAnswered = false, 
    isHighlighted = false,
}: QuestionProps) {
    return (
        <div className={cl(
            'question',
            { answered: isAnswered },
            { highlighted: isHighlighted && !isAnswered}
        )}
        >
            {/*<div className={`question ${isAnswered ? 'answered' : ''} ${isHighlighted ? 'highlighted' : ''}`}>*/}
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}