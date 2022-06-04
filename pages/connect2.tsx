import { useLayoutEffect } from 'react'

export const Page = () => {
  useLayoutEffect(() => {
    if (!window) return

    let twitter = {
      oauth_token: '284727157-y9k8SyVXBsEMppDw3ampJqjeeSJx02vTnrrSazg6',
      oauth_token_secret: '4LUAXbRbTew0HhXglR94Rt2QVvlm3UFEyxBYKPBQyzJnX',
      user_id: '284727157',
      screen_name: 'xamgore'
    }

    window.opener?.postMessage({ from: 'connect2', twitter }, '*')
  }, [window])
  return null
}

export default Page
