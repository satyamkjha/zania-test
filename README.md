# Instructions to run this project

This repository contains a React application that can be run using Docker Compose. The application is accessible via an IP address URL provided by Docker.

## Getting Started

To run this React application locally using Docker Compose, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- Docker
- Docker Compose

### Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/zania-test.git
   cd zania-test

   ```

2. Start the application:

   ```bash'
   docker-compose -f docker-compose.yml up

   ```

3. Access the application:

   Open your web browser and navigate to the IP address URL provided by Docker. Typically, it should be something like http://localhost or http://192.168.99.100, depending on your Docker setup. Do not use the    
   http://localhost URL. For some reason i was not able to setup msw for this URL

4.  Stop the application:

    To stop the application and shut down the containers, press Ctrl + C in the terminal where docker-compose is running. Alternatively, you can run the following command in a separate terminal:

   ```bash
   docker-compose down

   ```

### Without using Docker

To run this React application locally using Docker Compose,

# Approach to the Problem

### Understanding the Requirements

The first step was to break down the requirements into manageable tasks:

1. Load and display static JSON data as cards.
2. Arrange the cards in a grid (3 cards in the first row, 2 in the second row).
3. Implement drag-and-drop functionality to reorder cards.
4. Display an image overlay when a card is clicked.
5. Create a local service to mock a server and handle data persistence.
6. Save the card positions periodically and display a loading spinner.

### Component Structure

To ensure modularity and reusability, I designed the application with the following components:

CardGrid: The main container that fetches data, handles drag-and-drop logic, and renders the grid of cards.
Card: A presentational component responsible for rendering individual cards and handling user interactions like dragging and clicking.
Mock folder will contain all the serivces used to handle the APIs

Followed the following steps to complete this task

1. UI Creation
   First, I designed the UI layout for the card grid to conform to a 3-2 structure. Next, I created the UI for each card to display both the image and label.

2. Data Management
   Initial Data Load: Loaded from a static JSON file to populate the cards initially.
   State Management: Managed in the CardGrid component using React's useState hook to track the current order and positions of the cards.
   Local Storage: Used to ensure data persistence across page reloads. This allows the application to remember the card positions even after a refresh.

3. Drag-and-Drop Implementation
   Drag Events: Implemented onDragStart, onDragOver, and onDrop handlers to manage dragging logic.
   onDragStart: Captures the index of the dragged card.
   onDragOver: Allows the card to be dropped.
   onDrop: Updates the positions of the dragged and target cards and reorders them based on their new positions.
   Position Update: The positions of the cards are swapped and the array is sorted based on these positions to ensure correct order.

4. Overlay for Image View
   Click Event: Clicking a card sets the overlay image state.
   Close Overlay: The overlay can be closed by clicking outside the image or pressing the ESC key, using event listeners for keydown events. event listener will be removed when the component unmounts

5. Mock API Service
   msw: Used the msw (Mock Service Worker) library to mock the REST API.
   GET /api/documents: Fetches the current card data from the local storage. If data is not present loads the data from a JSON file.
   POST /api/documents: Updates the card data and saves it to local storage.

6. Periodic Saving
   Initial Load: calls the GET API to get the card list
   Auto-Save: Implemented an interval that saves the card state to the mock server every five seconds if changes are detected.
   Loading Spinner: Displays a spinner while the save operation is in progress and shows the last save time.
