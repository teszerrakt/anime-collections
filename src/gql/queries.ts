import { gql } from '@apollo/client'

interface Anime {
    id: number
    coverImage: {
        large: string
    }
    title: {
        romaji: string
    }
}

interface PageInfo {
    hasNextPage: boolean
}

export interface AnimeListData {
    Page: {
        pageInfo: PageInfo
        media: Anime[]
    }
}

export interface AnimeListVars {
    page: number
    perPage: number
}

export const ANIME_LIST = gql`
    query Query($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                hasNextPage
            }
            media {
                id
                title {
                    romaji
                }
                coverImage {
                    large
                }
            }
        }
    }`