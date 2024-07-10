import React from 'react'

// BikeServiceLogog component
// This component renders a logo for a bike service
const BikeServiceLogog = () => {
    return (
        // The component returns a div that contains an SVG image and a heading
        <div className='flex space-x-2'>
            {/* The SVG image represents a bicycle wheel */}
            <svg width="47" height="45" viewBox="-34 4 280 190" xmlns="http://www.w3.org/2000/svg">
                {/* The 'wheel' group contains the various elements that make up the wheel */}
                <g id="wheel">
                    {/* The outer circle of the wheel */}
                    <circle cx="100" cy="100" r="130" fill="#113191c5" stroke="black" strokeWidth="5" />
                    {/* The middle circle of the wheel */}
                    <circle cx="100" cy="100" r="105" fill="#6B7280" stroke="black" strokeWidth="5" />
                    {/* The inner circle of the wheel */}
                    <circle cx="100" cy="100" r="85" fill="white" stroke="black" strokeWidth="5" />
                    {/* The hub of the wheel */}
                    <circle cx="100" cy="100" r="30" fill="#FCD34D" />
                    {/* The center of the hub */}
                    <circle cx="100" cy="100" r="20" fill="black" />

                    {/* The 'spokes' group contains the lines that represent the spokes of the wheel */}
                    <g id="spokes">
                        {/* The spokes are drawn using lines */}
                        <line x1="100" y1="15" x2="100" y2="185" stroke="black" strokeWidth="4" />
                        <line x1="100" y1="15" x2="100" y2="185" stroke="black" strokeWidth="4" />
                        <line x1="100" y1="15" x2="100" y2="185" stroke="black" strokeWidth="4" />
                        <line x1="100" y1="15" x2="100" y2="185" stroke="black" strokeWidth="4" />
                        <line x1="15" y1="100" x2="185" y2="100" stroke="black" strokeWidth="4" />
                        <line x1="15" y1="100" x2="185" y2="100" stroke="black" strokeWidth="4" />
                        <line x1="15" y1="100" x2="185" y2="100" stroke="black" strokeWidth="4" />
                        <line x1="15" y1="100" x2="185" y2="100" stroke="black" strokeWidth="4" />
                    </g>
                    {/* The spokes are rotated using the 'use' element and 'transform' attribute */}
                    <use href="#spokes" transform="rotate(22.5 100 100)" />
                    <use href="#spokes" transform="rotate(45 100 100)" />
                    <use href="#spokes" transform="rotate(67.5 100 100)" />
                    <use href="#spokes" transform="rotate(90 100 100)" />
                </g>

                {/* The wheel is animated to rotate indefinitely */}
                <animateTransform href="#wheel" attributeName="transform" attributeType="XML" type="rotate" from="0 100 100"
                    to="360 100 100" dur="4s" repeatCount="indefinite" />
            </svg>
            {/* The heading for the bicycle service */}
            <h1 className='text-3xl font-bold mt-2 text-blue-700'>BikeService</h1>
        </div>
    )
}

export default BikeServiceLogog