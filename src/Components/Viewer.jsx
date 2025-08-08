import React from 'react';

export const Viewer = ({ viewerRef, colorOptions, selectedColor, setSelectedColor, prev, next }) => {

  return (
    <section id="viewer" ref={viewerRef} className='relative h-screen w-full px-8 py-6'>
      <p className='heading text-center md:text-start'>Product Viewer</p>
      <div className='flex flex-col justify-center items-center absolute left-1/2 bottom-1/32 transform -translate-x-1/2 -translate-y-1/2 z-50'>
        <div className='flex items-center gap-4'>
          <button
            aria-label="Previous color"
            className="text-2xl px-2 py-1 rounded-full bg-gray-800 hover:bg-gray-700"
            onClick={() => setSelectedColor(colorOptions[prev])}
          >&lt;</button>
          <div className='flex gap-2'>
            {colorOptions.map((color, index) => (
              <div key={index}>
                <div
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${selectedColor.name === color.name ? 'border-yellow-400' : 'border-white'}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color)}
                />
              </div>
            ))}
          </div>
          <button
            aria-label="Next color"
            className="text-2xl px-2 py-1 rounded-full bg-gray-800 hover:bg-gray-700"
            onClick={() => setSelectedColor(colorOptions[next])}
          >&gt;</button>
        </div>
        <div className='text-sm text-center mt-2 text-secondary-text'>
          {selectedColor.name}
        </div>
      </div>
    </section>
  );
};