// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';
import initialData from './documents.json';

export const handlers = [
	http.get('/api/documents/', ({ request }) => {
		let data = JSON.parse(localStorage.getItem('documents')) || initialData;

		return HttpResponse.json({ cardData: data });
	}),
	http.post('/api/documents/', async ({ request }) => {
		let data = await request.json();
		localStorage.setItem('documents', JSON.stringify(data.cardData));
		return HttpResponse.json(initialData);
	}),
];
