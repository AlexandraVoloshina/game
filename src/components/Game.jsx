import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Game = () => {
  const [player, setPlayer] = useState({ x: 5, y: 5 });

  const movePlayer = (direction) => {
    const speed = 5;
    switch (direction) {
      case 'up':
        setPlayer((prev) => ({ ...prev, y: prev.y - speed }));
        isTriangleOnGray();
        break;
      case 'down':
        setPlayer((prev) => ({ ...prev, y: prev.y + speed }));
        isTriangleOnGray();
        break;
      case 'left':
        setPlayer((prev) => ({ ...prev, x: prev.x - speed }));
        isTriangleOnGray();
        break;
      case 'right':
        setPlayer((prev) => ({ ...prev, x: prev.x + speed }));
        isTriangleOnGray();
        break;
      default:
        break;
    }
  };

  const isPointInTriangle = (x, y) => {
    const path = document.querySelector('path');
    const point = path.ownerSVGElement.createSVGPoint();
    point.x = x;
    point.y = y;
  
    return path.isPointInFill(point) || path.isPointInStroke(point);
  };

  const isTriangleOnGray = () => {

    let noseCollision = false;
    let backCollision = false;
    let sideCollision = false;

    const triangleParts = [
      { x: player.x, y: player.y, width: 100, height: 100 }, // верхняя часть
      { x: player.x - 25, y: player.y + 50, width: 100, height: 100 }, // левая часть
      { x: player.x + 75, y: player.y + 50, width: 100, height: 100 }, // правая часть
    ];
  
    for (const [i, part] of triangleParts.entries()) {
      const centerX = part.x + part.width / 2;
      const centerY = part.y + part.height / 2;

      if(!isPointInTriangle(centerX, centerY) && i === 1){
        noseCollision = true;
      }  
      if(!isPointInTriangle(centerX + 25, centerY) && i === 2){
        backCollision = true;
      }
      if(!isPointInTriangle(centerX - 25, centerY) && i === 0){
        sideCollision = true;
      } 
    }

    if(noseCollision && sideCollision){
        toast("Side Collision!");
    } else if(backCollision){
        toast("Back Collision!");
    } else if(noseCollision) {
        toast("Nose Collision!");
    }


  
   // console.log('true'); // Все части на сером фоне
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f0f0f0',
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowUp') movePlayer('up');
        else if (e.key === 'ArrowDown') movePlayer('down');
        else if (e.key === 'ArrowLeft') movePlayer('left');
        else if (e.key === 'ArrowRight') movePlayer('right');
      }}
      tabIndex="0"
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="100%" height="100%" fill="gray" />
        <path
          d={`M0,0
              C${window.innerWidth},${window.innerHeight / 10} 
              ${window.innerWidth / 15},${window.innerHeight}
              ${window.innerWidth},${window.innerHeight}`}
          fill="none"
          stroke="white"
          strokeWidth="300"
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: player.y,
          left: player.x,
          width: '0',
          height: '0',
          borderTop: '100px solid red',
          borderLeft: '50px solid transparent',
          borderRight: '50px solid transparent',
        }}
      ></div>
      <ToastContainer />
    </div>
  );
};

export default Game;