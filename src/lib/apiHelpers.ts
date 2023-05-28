import axios from 'axios'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

export const getMethod = (url: string) => axios.get(url).then((response) => response.data)

export const postMethod = (url: string, { arg }: { arg: any }) => axios.post(url, arg).then((response) => response.data)

export const useEmailSend = () => {
  const { data, trigger, error } = useSWRMutation(`${process.env.PORTFOLIO_API_URL}/sendEmail`, postMethod)

  return {
    trigger,
    data,
    error,
    isLoading: !data && !error,
  }
}

export const useInfoGetById = (id: string) => {
  const { data, error } = useSWR(`${process.env.PORTFOLIO_API_URL}/info/${id}`, getMethod)

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}

export const useBlogsGetByInfoId = (infoId: string) => {
  const { data, error } = useSWR(`${process.env.PORTFOLIO_API_URL}/blogs/user/${infoId}`, getMethod)

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}

export const useBlogGetById = (id: string) => {
  const { data, error } = useSWR(`${process.env.PORTFOLIO_API_URL}/blogs/${id}`, getMethod)

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}

export const useExperiencesGetById = (id: string) => {
  const { data, error } = useSWR(`${process.env.PORTFOLIO_API_URL}/experience/user/${id}`, getMethod)

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}

export const useWorksGetById = (id: string) => {
  const { data, error } = useSWR(`${process.env.PORTFOLIO_API_URL}/works/user/${id}`, getMethod)

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}
