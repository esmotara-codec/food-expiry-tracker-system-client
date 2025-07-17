// Mapping range strings to number of days
const expiryMap = {
     '1week': 7,
    '2week': 14,
    '1month': 30,
    '2months': 60,
    '3months': 90,
    '6months': 180,
    '1years': 365,
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
