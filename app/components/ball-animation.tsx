"use client"

import { useEffect, useRef } from "react"

export default function BallAnimation() {
  const ballRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ball = ballRef.current
    if (!ball) return
    
    let direction = 1 // 1 for right, -1 for left
    let position = { x: 20, y: window.innerHeight * 0.2 } // Start from left top
    let velocity = { x: 2, y: 0 }
    let gravity = 0.2
    let elasticity = 0.7
    let friction = 0.99
    let rotation = 0
    let rotationSpeed = 3 // Rotation speed
    let isVisible = true
    
    function animate() {
      if (!ball) return
      
      // Apply gravity
      velocity.y += gravity
      
      // Update position
      position.x += direction * velocity.x
      position.y += velocity.y
      
      // Apply friction
      velocity.x *= friction
      velocity.y *= friction
      
      // Handle bottom collision
      if (position.y > window.innerHeight - 20) {
        position.y = window.innerHeight - 20
        velocity.y = -velocity.y * elasticity
      }
      
      // Update rotation - rotate faster when moving faster
      rotation += rotationSpeed * Math.abs(velocity.x / 2)
      ball.style.transform = `rotate(${rotation}deg)`
      
      // Right bottom corner sink effect
      if (position.x > window.innerWidth - 40 && position.y > window.innerHeight - 40) {
        // Start sinking animation
        isVisible = false
        ball.style.opacity = '0'
        ball.style.transform = `rotate(${rotation}deg) scale(0.5)`
        
        // Reset position to top left after a delay
        setTimeout(() => {
          position = { x: 20, y: window.innerHeight * 0.2 }
          velocity = { x: 2, y: 0 }
          direction = 1
          isVisible = true
          ball.style.opacity = '1'
          ball.style.transform = `rotate(${rotation}deg) scale(1)`
        }, 800)
      } 
      else if (position.x > window.innerWidth - 20 && direction === 1) {
        // Normal right edge bounce
        direction = -1
        position.x = window.innerWidth - 20
        velocity.y = -6
      }
      
      // Handle left edge
      if (position.x < 20 && direction === -1) {
        direction = 1
        position.x = 20
        velocity.y = -6
      }
      
      // Keep velocity from getting too small
      if (Math.abs(velocity.x) < 2) {
        velocity.x = direction * 2
      }
      
      // Apply position only if visible
      if (isVisible) {
        ball.style.left = `${position.x}px`
        ball.style.top = `${position.y}px`
      }
      
      requestAnimationFrame(animate)
    }
    
    // Start animation
    animate()
    
    // Handle window resize
    function handleResize() {
      // Reset if out of bounds
      if (position.x > window.innerWidth || position.y > window.innerHeight) {
        position = { x: 20, y: window.innerHeight * 0.2 }
      }
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return (
    <div 
      ref={ballRef}
      className="fixed w-5 h-5 rounded-full bg-white  pointer-events-none z-10"
      style={{
        left: '20px',
        top: '20%',
        boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.1)',
        transition: 'opacity 0.3s, transform 0.3s'
      }}
    >
      {/* Adding internal visual texture to make rotation more visible */}
      <div className="absolute inset-0 rounded-full bg-white/40" style={{ width: '50%', height: '50%', left: '25%', top: '25%' }}></div>
    </div>
  )
}