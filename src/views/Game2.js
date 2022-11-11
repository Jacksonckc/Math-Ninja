import { useState, useRef, useCallback } from 'react';


function Game() {
  const canvasRef = useRef();


  const animate = useCallback((timestamp) => {
    const canvas = canvasRef.current; 
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
  }
  )



  return (
    <canvas ref={canvasRef} width="1000" height="1000"></canvas>
  );
}