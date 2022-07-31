import { api } from '@/Services/api'
import getToDo from './getToDo'

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    getToDo: getToDo(build),
  }),
  overrideExisting: false,
})

export const { useLazyGetToDoQuery } = userApi
