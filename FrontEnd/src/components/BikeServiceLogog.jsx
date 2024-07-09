import React from 'react'

const BikeServiceLogog = () => {
  return (
      <div className='flex space-x-2'>
          <svg width="47" height="45" viewBox="-34 4 280 190" xmlns="http://www.w3.org/2000/svg">
              <g id="wheel">
                  <circle cx="100" cy="100" r="130" fill="#113191c5" stroke="black" strokeWidth="5" />
                  <circle cx="100" cy="100" r="105" fill="#6B7280" stroke="black" strokeWidth="5" />
                  <circle cx="100" cy="100" r="85" fill="white" stroke="black" strokeWidth="5" />
                  <circle cx="100" cy="100" r="30" fill="#FCD34D" />
                  <circle cx="100" cy="100" r="20" fill="black" />

                  <g id="spokes">
                      <line x1="100" y1="15" x2="100" y2="185" stroke="black" strokeWidth="4" />
                      <line x1="100" y1="15" x2="100" y2="185" stroke="black" strokeWidth="4" />
                      <line x1="100" y1="15" x2="100" y2="185" stroke="black" strokeWidth="4" />
                      <line x1="100" y1="15" x2="100" y2="185" stroke="black" strokeWidth="4" />
                      <line x1="15" y1="100" x2="185" y2="100" stroke="black" strokeWidth="4" />
                      <line x1="15" y1="100" x2="185" y2="100" stroke="black" strokeWidth="4" />
                      <line x1="15" y1="100" x2="185" y2="100" stroke="black" strokeWidth="4" />
                      <line x1="15" y1="100" x2="185" y2="100" stroke="black" strokeWidth="4" />
                  </g>
                  <use href="#spokes" transform="rotate(22.5 100 100)" />
                  <use href="#spokes" transform="rotate(45 100 100)" />
                  <use href="#spokes" transform="rotate(67.5 100 100)" />
                  <use href="#spokes" transform="rotate(90 100 100)" />
              </g>

              <animateTransform href="#wheel" attributeName="transform" attributeType="XML" type="rotate" from="0 100 100"
                  to="360 100 100" dur="4s" repeatCount="indefinite" />
          </svg>
          <h1 className='text-3xl font-bold mt-2 text-blue-700'>BikeService</h1>
      </div>
  )
}

export default BikeServiceLogog