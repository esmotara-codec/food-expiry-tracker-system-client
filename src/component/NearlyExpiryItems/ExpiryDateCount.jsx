// Mapping range strings to number of days
const expiryMap = {
     '1week': 7,
    '2week': 14,
    '1month': 30,
    '1-2months': 60,
    '3-6months': 120,
    '6-12months': 240,
    '1-1.5years': 365,
     '2years': 730,
};

// Convert to actual expiry date
export const getActualExpiryDate = (dateAdded, expiryRange) => {
    const daysToAdd = expiryMap[expiryRange] || 0;
    const addedDate = new Date(dateAdded);
    addedDate.setDate(addedDate.getDate() + daysToAdd);
    return addedDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};
