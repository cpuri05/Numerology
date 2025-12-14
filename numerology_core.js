/**
 * Core Numerology Logic Module
 * Designed with a Python-like Class structure for modularity.
 */

class NumerologyEngine {
    constructor() {
        // Mapping Alphabets to Numbers (Chaldean System)
        // 9 is excluded from letter mapping.
        this.LETTER_MAP = {
            1: ['A', 'I', 'J', 'Q', 'Y'],
            2: ['B', 'K', 'R'],
            3: ['C', 'G', 'L', 'S'],
            4: ['D', 'M', 'T'],
            5: ['E', 'H', 'N', 'X'],
            6: ['U', 'V', 'W'],
            7: ['O', 'Z'],
            8: ['F', 'P']
        };

        // Planetary Relationships based on your table
        // Format: { SourceNumber: { friends: [], neutral: [], enemy: [] } }
        this.RELATIONSHIPS = {
            1: { friends: [2, 3, 9], neutral: [5], enemy: [4, 6, 7, 8] },
            2: { friends: [1, 5], neutral: [3, 6, 8, 9], enemy: [4, 7] },
            3: { friends: [1, 2, 9], neutral: [4, 7, 8], enemy: [5, 6] },
            4: { friends: [5, 6, 8], neutral: [3], enemy: [1, 2, 7, 9] },
            5: { friends: [1, 4, 6, 7], neutral: [3, 8, 9], enemy: [2] },
            6: { friends: [4, 5, 8], neutral: [3, 7, 9], enemy: [1, 2] },
            7: { friends: [5, 6, 8], neutral: [3], enemy: [1, 2, 4, 9] },
            8: { friends: [4, 5, 6], neutral: [3, 7], enemy: [1, 2, 9] },
            9: { friends: [1, 2, 3], neutral: [6, 8], enemy: [4, 5, 7] }
        };
    }

    /**
     * Converts a string into a single digit vibration number.
     * @param {string} text - The input text (e.g., "Alice").
     * @returns {number} - The single digit result (1-9).
     */
    calculate_vibration(text) {
        if (!text) return 0;
        
        // Clean text: remove non-letters, convert to uppercase
        const clean_text = text.replace(/[^a-zA-Z]/g, '').toUpperCase();
        let total_sum = 0;

        // Step 1: Sum the value of letters
        for (let char of clean_text) {
            for (let [num, letters] of Object.entries(this.LETTER_MAP)) {
                if (letters.includes(char)) {
                    total_sum += parseInt(num);
                    break;
                }
            }
        }

        // Step 2: Recursive reduction (Digital Root)
        return this._get_digital_root(total_sum);
    }

    /**
     * Helper to recursively sum digits until single digit.
     */
    _get_digital_root(num) {
        if (num === 0) return 0;
        while (num > 9) {
            let sum = 0;
            while (num > 0) {
                sum += num % 10;
                num = Math.floor(num / 10);
            }
            num = sum;
        }
        return num;
    }

    /**
     * Determines relationship between two numbers.
     * @param {number} source_num 
     * @param {number} target_num 
     * @returns {string} - "Friend", "Neutral", or "Enemy"
     */
    check_compatibility(source_num, target_num) {
        if (!source_num || !target_num) return "Unknown";
        if (source_num === target_num) return "Friend"; // Same vibration is usually friendly

        const rel = this.RELATIONSHIPS[source_num];
        
        if (rel.friends.includes(target_num)) return "Friend";
        if (rel.neutral.includes(target_num)) return "Neutral";
        if (rel.enemy.includes(target_num)) return "Enemy";
        
        return "Neutral"; // Fallback
    }
}