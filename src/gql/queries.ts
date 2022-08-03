import { gql } from '@apollo/client'

export const ANIME_LIST = gql`
    query Query($page: Int) {
        Page(page: $page) {
            media {
                siteUrl
                title {
                    english
                    native
                }
                description
                coverImage {
                    medium
                }
                bannerImage
                volumes
                episodes
            }
        }
    }`