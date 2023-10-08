export function getTypeColor(type) {
    const typeColors = {
        'water': 'bg-blue-500',
        'fire': 'bg-red-500',
        'grass': 'bg-green-500',
        'electric': 'bg-yellow-500',
        'ice': 'bg-cyan-500',
        'fighting': 'bg-orange-500',
        'poison': 'bg-purple-500',
        'ground': 'bg-brown-800',
        'flying': 'bg-indigo-500',
        'psychic': 'bg-pink-500',
        'bug': 'bg-lime-500',
        'rock': 'bg-gray-500',
        'ghost': 'bg-indigo-800',
        'steel': 'bg-gray-400',
        'dragon': 'bg-indigo-900',
        'dark': 'bg-gray-900',
        'fairy': 'bg-pink-300',
        'normal': 'bg-gray-300',
    };

    return typeColors[type.toLowerCase()] || 'bg-gray-300';
}