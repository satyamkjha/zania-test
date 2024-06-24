import React from 'react';
import { CardData } from './CardContainer';

// Define the props interface for the Card component
interface CardProps {
	document: CardData; // The data for the card
	index: number; // The index of the card in the list
	onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void; // Handler for drag start event
	onDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void; // Handler for drag over event
	onDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void; // Handler for drop event
	onClick: (imageSrc: string) => void; // Handler for click event
}

// Functional component for rendering an individual card
const Card: React.FC<CardProps> = ({
	document,
	index,
	onDragStart,
	onDragOver,
	onDrop,
	onClick,
}) => {
	return (
		<div
			className='card' 
			draggable 
			onDragStart={(e) => onDragStart(e, index)} // Attach drag start handler
			onDragOver={(e) => onDragOver(e, index)} // Attach drag over handler
			onDrop={(e) => onDrop(e, index)} // Attach drop handler
			onClick={() => onClick(document.url)} // Attach click handler
		>
			<p>{document.position}</p> {/* Display the position of the card */}
			<img
				src={document.url}
				alt={document.title}
				style={{ width: '100%' }}
			/>{' '}
			{/* Display the image */}
			<p>{document.title}</p> {/* Display the title of the card */}
		</div>
	);
};

export default Card; // Export the Card component
