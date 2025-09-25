// src/utils/cleanText.js
import parse from 'html-react-parser';
import he from 'he';

export const cleanText = (html) => parse(he.decode(html || ''));
