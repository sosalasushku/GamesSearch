export const platforms = ['all', 'pc', 'browser']
export type platformType = 'all' | 'pc' | 'browser'

export const categories = ['all', 'mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 
    'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 
    'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 
    'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 
    'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts'] as const; 
export type categoryType = typeof categories[number]; 

export const sortings = ['release-date', 'popularity', 'alphabetical', 'relevance'] as const
export type sortingType = typeof sortings[number]

export type imageLinks = {
    thumbnail: string,
    smallThumbnail?: string
}

export type GameType = {
    id: number,
    title: string,
    thumbnail: string,
    short_description: string,
    game_url: string,
    genre: string,
    platform: string,
    publisher: string,
    developer: string,
    release_date: string,
    freetogame_profile_url: string
}

export type GameInfoType = {
    id: number,
    title: string,
    thumbnail: string,
    status: string,
    short_description: string,
    description: string,
    game_url: string,
    genre: categoryType,
    platform: string,
    publisher: string,
    developer: string,
    release_date: string,
    freetogame_profile_url: string,
    minimum_system_requirements: {
        os?: string,
        processor?: string,
        memory?: string,
        graphics?: string,
        storage?: string,
    },
    screenshots: Array<{ id: number, image: string }>,
}

export type GameProps = {
    game: GameType,
    key: number
}