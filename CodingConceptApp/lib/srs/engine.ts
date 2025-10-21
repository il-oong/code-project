// lib/srs/engine.ts

export interface SrsItem {
  id: string;
  lastReviewed: number; // Timestamp
  interval: number; // Days
  easeFactor: number; // Factor for increasing interval
  repetitions: number; // Number of times reviewed
  nextReview: number; // Timestamp for next review
}

const INITIAL_INTERVAL = 1; // 1 day
const INITIAL_EASE_FACTOR = 2.5;

/**
 * Calculates the next review date for an SRS item based on the SM-2 algorithm.
 * @param item The SRS item to update.
 * @param quality The quality of the review (0-5).
 * @returns The updated SRS item.
 */
export function calculateNextReview(item: SrsItem, quality: number): SrsItem {
  let { interval, easeFactor, repetitions } = item;

  if (quality >= 3) {
    repetitions++;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (easeFactor < 1.3) {
      easeFactor = 1.3;
    }
  } else {
    repetitions = 0;
    interval = 1;
  }

  const nextReview = Date.now() + interval * 24 * 60 * 60 * 1000; // Convert days to milliseconds

  return {
    ...item,
    lastReviewed: Date.now(),
    interval,
    easeFactor,
    repetitions,
    nextReview, // Add nextReview to the item
  };
}

/**
 * Initializes a new SRS item.
 * @param id The unique ID of the item.
 * @returns The new SRS item.
 */
export function initializeSrsItem(id: string): SrsItem {
  return {
    id,
    lastReviewed: 0, // Not yet reviewed
    interval: 0,
    easeFactor: INITIAL_EASE_FACTOR,
    repetitions: 0,
    nextReview: 0, // Not yet scheduled
  };
}

/**
 * Filters a list of SRS items to find those that are due for review.
 * @param srsItems An array of SRS items.
 * @returns An array of due SRS items.
 */
export function getDueSrsItems(srsItems: SrsItem[]): SrsItem[] {
  const now = Date.now();
  return srsItems.filter(item => item.nextReview <= now);
}
