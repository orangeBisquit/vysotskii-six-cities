import {User} from './offers';

export type Review = {
  comment: string
  date: string
  id: number
  rating: number
  user: User,
}

export type ReviewPost = {
  comment: string
  id: number | undefined
  rating: number
}


