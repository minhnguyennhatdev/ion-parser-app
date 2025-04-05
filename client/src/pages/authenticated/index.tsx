import { GetServerSidePropsContext } from "next"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { authenticated } from "@/services/ion-parser";
import { setTokens, Tokens } from "@/utils/tokens";

const Authenticated = (tokens: Tokens) => {
  const router = useRouter()
  useEffect(() => {
    setTokens(tokens)
    router.push("/")
  })
  return "hi"
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { token } = context?.query
  if (!token) {
    return {
      redirect: {
        destination: '/unauthorized',
        permanent: false
      }
    }
  }
  const { data } = await authenticated(token as string)
  if (!data) {
    return {
      redirect: {
        destination: '/unauthorized',
        permanent: false
      }
    }
  }
  return {
    props: data
  }
}
export default Authenticated