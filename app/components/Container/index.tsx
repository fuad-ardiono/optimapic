import type React from "react";

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, ...props }: ContainerProps) {
  return (
    <>
      <div className={`flex flex-col h-screen ${props.className ? props.className : ''}`}>
        { children }
      </div>
    </>
  )
}
