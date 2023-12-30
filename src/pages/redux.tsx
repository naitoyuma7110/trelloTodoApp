import React from 'react'
import { store } from '@/store/store'
import { Provider } from 'react-redux'
import CounterChild from '@/features/reduxSample/components/counterChild'

export default function Redux() {
  return (
    <Provider store={store}>
      <CounterChild />
      <CounterChild />
      <CounterChild />
    </Provider>
  )
}
