import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import './CardGrid.css';

// Define the structure of the CardData interface
export interface CardData {
	type: string;
	title: string;
	url: string;
	position: number;
}

const CardContainer: React.FC = () => {
	// State variables
	const [cardList, setCardList] = useState<CardData[]>([]); // List of cards
	const [overlayImage, setOverlayImage] = useState<string | null>(null); // Image for overlay display
	const [loading, setLoading] = useState(false); // Loading state for saving spinner
	const [lastSaved, setLastSaved] = useState<Date | null>(null); // Timestamp of last save

	// Fetch card data from the server when the component mounts
	useEffect(() => {
		fetch('/api/documents/')
			.then((response) => response.json())
			.then((data) => {
				if (data.cardData) {
					setCardList(data.cardData); // Set card data
				}
			});
	}, []);

	// Handler for drag start event
	const handleDragStart = useCallback(
		(e: React.DragEvent<HTMLDivElement>, index: number) => {
			e.dataTransfer.setData('text/plain', index.toString()); // Store the dragged index
		},
		[]
	);

	// Handler for drag over event
	const handleDragOver = useCallback(
		(e: React.DragEvent<HTMLDivElement>, index: number) => {
			e.preventDefault(); // Prevent default to allow dropping
		},
		[]
	);

	// Handler for drop event
	const handleDrop = useCallback(
		(e: React.DragEvent<HTMLDivElement>, index: number) => {
			e.preventDefault();
			const draggedIndex = Number(e.dataTransfer.getData('text/plain')); // Get the dragged index
			if (draggedIndex === index) return; // No action if dropped in the same position

			const updatedCardList = [...cardList];

			// Swap positions of the dragged and target cards
			const draggedCard = updatedCardList[draggedIndex];
			const targetCard = updatedCardList[index];
			const draggedPosition = draggedCard.position;
			draggedCard.position = targetCard.position;
			targetCard.position = draggedPosition;

			// Sort cards based on their position
			const sortedCardList = updatedCardList.sort(
				(a, b) => a.position - b.position
			);

			setCardList(sortedCardList); // Update the card list
		},
		[cardList]
	);

	// Handler for card click event to show overlay
	const handleClick = useCallback((imageSrc: string) => {
		setOverlayImage(imageSrc);
	}, []);

	// Handler to close the image overlay
	const handleImageOverlayClose = useCallback(() => {
		setOverlayImage(null);
	}, []);

	// Effect to handle closing the overlay with the Escape key
	useEffect(() => {
		const handleEscKey = (event: KeyboardEvent) => {
			if (event.keyCode === 27) {
				handleImageOverlayClose();
			}
		};
		window.addEventListener('keydown', handleEscKey);
		return () => {
			window.removeEventListener('keydown', handleEscKey);
		};
	}, [handleImageOverlayClose]);

	// Effect to auto-save card data every 5 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			if (!loading) {
				setLoading(true);
				fetch('/api/documents/', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ cardData: cardList }),
				}).then(() => {
					clearInterval(interval);
					setLoading(false);
					setLastSaved(new Date()); // Update the last saved timestamp
				});
			}
		}, 5000);

		return () => clearInterval(interval); // Cleanup the interval
	}, [cardList, loading]);

	return (
		<React.Fragment>
			<div className='card-grid'>
				{cardList.map((document, index) => (
					<Card
						key={document.type}
						document={document}
						index={index}
						onDragStart={handleDragStart}
						onDragOver={handleDragOver}
						onDrop={handleDrop}
						onClick={handleClick}
					/>
				))}
			</div>
			{overlayImage && (
				<div className='overlay' onClick={handleImageOverlayClose}>
					<img src={overlayImage} alt='Document' className='overlay-image' />
				</div>
			)}
			{loading && <div className='saving-spinner'>Saving...</div>}
			{lastSaved && <div>Last saved: {lastSaved.toLocaleTimeString()}</div>}
		</React.Fragment>
	);
};

export default CardContainer;
