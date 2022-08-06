import { gql } from '@apollo/client'

interface Anime {
  id: number
  coverImage: {
    large: string
  }
  bannerImage: string
  title: {
    romaji: string
    native: string
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
                    native
                }
                bannerImage
                coverImage {
                    large
                }
            }
        }
    }
`

export interface AnimeDetail {
  id: number
  title: {
    romaji: string
    native: string
  }
  bannerImage: string
  coverImage: {
    large: string
    extraLarge: string
  }
  description: string
  episodes: number
  genres: string[]
  seasonYear: number
  season: string
  averageScore: number
}

export interface AnimeDetailData {
  Media: AnimeDetail
}

export interface AnimeDetailVars {
  id: number
}

export const ANIME_DETAIL = gql`
    query Query($id:Int) {
        Media(id: $id) {
            id
            title {
                romaji
                native
            }
            bannerImage
            coverImage {
                large
                extraLarge
            }
            description
            episodes
            genres
            seasonYear
            averageScore
            season
        }
    }
`