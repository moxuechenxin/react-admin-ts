import React from 'react'
import NotFoundImg from '@/assets/images/404.gif'

export default () => {
  return (
    <div className="flex--center" style={{ height: '100vh' }}>
      <img src={NotFoundImg} width="400" alt="404"/>
    </div>
  )
}