// as middlewares do not work in next.js by some reason
// https://nextjs.org/docs/advanced-features/middleware
// we just reexport /nft page

import page from './nft/index'
export default page
