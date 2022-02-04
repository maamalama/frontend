import { AppProps } from 'next/app'
import '../global.css'

const App = ({ pageProps, Component }: AppProps) => <Component {...pageProps} />

export default App
