/**
 * Utility functions for the banknote collection website
 */

// Shorthand for document.querySelector
const $ = (s) => document.querySelector(s);

// Shorthand for document.querySelectorAll
const $$ = (s) => document.querySelectorAll(s);

// Format currency values
function formatCurrency(value, currency = '') {
  if (value === null || value === undefined) return '—';
  return `${value} ${currency}`.trim();
}

// Format date (year)
function formatYear(year) {
  if (!year) return '—';
  return year.toString();
}

// Create a URL-friendly slug from a string
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

// Get URL parameters as an object
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
}