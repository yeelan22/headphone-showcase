import React from 'react'
import { Html } from '@react-three/drei'
export function Loader() {
  return (
    <Html className="fixed inset-0 bg-black text-white flex justify-center items-center z-50">
      <h1 className="text-xl animate-pulse">Loading Model...</h1>
    </Html>
  )
}