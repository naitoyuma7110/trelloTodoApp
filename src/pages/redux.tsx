import React from 'react'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import CounterChild from '@/components/ReduxSample/counterChild'

export default function Redux() {
  return (
    <Provider store={store}>
      <CounterChild />
    </Provider>
  )
}
