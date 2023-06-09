import { useState, useEffect } from 'react'
import AuthButtons from '@/components/AuthButtons'
import { auth } from '@/firebase/app'
import { Flex, Heading, Image, Text } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'

const Home = () => {
  const [user, loading] = useAuthState(auth)
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const formatTime = (date: Date) => {
      const formatter = new Intl.DateTimeFormat([], {
        hour: '2-digit',
        hour12: false,
      })
      return parseInt(formatter.format(date), 10)
    }

    const getGreeting = () => {
      const currentTime = formatTime(new Date())
      if (currentTime >= 0 && currentTime < 12) {
        return 'Good Morning'
      } else if (currentTime >= 12 && currentTime < 18) {
        return 'Good Afternoon'
      } else {
        return 'Good Evening'
      }
    }

    setGreeting(getGreeting())
  }, [])

  return (
    <Flex
      direction="column"
      align="center"
      position="relative"
      top={200}
      text-align="center"
      width={{ base: '80%', md: '60%', lg: '600px' }}
      height="100vh"
      mx="auto"
    >
      <Flex w="full" direction="column" align="stretch" textAlign="center">
        <Heading fontSize="20pt" fontWeight={700} mt={-40}>
          Welcome Back
        </Heading>
        <Text fontSize="14pt" mt={16}>
          {loading && '🕒 Checking authentication...'}
          {!loading &&
            user &&
            `${greeting} ${user?.displayName}, Glad to have you again!`}
          {!user && 'Kindly Sign In'}
        </Text>

        {!loading && user && (
          <>
            <Text fontSize={20} fontWeight={600}>
              Using Vimeo as a video player
            </Text>
            <iframe
              title="vimeo-player"
              src="https://player.vimeo.com/video/844896946?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              width="640"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>

            <Text fontSize={20} fontWeight={600}>
              Using YouTube as a video player
            </Text>
            <iframe
              width="640"
              height="360"
              src="https://www.youtube.com/embed/3rrnoYWZnxk"
              title="Firebase in Development"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </>
        )}

        <Flex mt={16}>
          <AuthButtons />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Home
