import React, { Suspense } from 'react'
import Dashboard from './[button]/page'

const page = () => {
  return (
    <Suspense>
      <Dashboard/>
    </Suspense>
  )
}

export default page
