import { useState } from "react";
import hero_img from "../images/Gemini_Generated_Image_ome79jome79jome7.png";
import logo from "../images/52b18fba-4887-4d95-a3f4-aaa607f1dffd.jfif";
import m from "../images/BrewSense.png";
import e from "../images/ChatGPT Image Mar 14, 2026, 09_18_08 PM.png"

function ImageCarousel() {
    const imgArr = [logo, hero_img, m, e];
    const [currentIndex, setCurrentIndex] = useState<number>(0);
  
    const nextSlide = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % imgArr.length);
    const prevSlide = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + imgArr.length) % imgArr.length);
    const currentSlide = (index: number) => setCurrentIndex(index);
  
    return (
      <div className="relative w-full mt-40 overflow-hidden">
        
      
        <div 
          className="absolute inset-0 z-0 transition-all duration-700 ease-in-out scale-110  opacity-50"
          style={{
            backgroundImage: `url(${imgArr[currentIndex]})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
  
      
        <div className="relative z-10 flex justify-center items-center w-full py-10 bg-white/10 backdrop-blur-md">
          
         
          <button className="z-20 bg-gray-700/50 p-5 rounded-full cursor-pointer hover:bg-gray-800 transition-all shadow-lg" onClick={prevSlide}>
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="fill-white"><path d="M6.707 8.293a1 1 0 0 1 0 1.414l-1.292 1.293h7.585a1 1 0 0 1 0 2h-7.585l1.292 1.293a1 1 0 0 1 .083 1.32l-.083 .094a1 1 0 0 1 -1.414 0l-3 -3a1 1 0 0 1 -.097 -.112l-.071 -.11l-.054 -.114l-.035 -.105l-.025 -.118l-.007 -.058l-.004 -.09l.003 -.075l.017 -.126l.03 -.111l.044 -.111l.052 -.098l.067 -.096l.08 -.09l3 -3a1 1 0 0 1 1.414 0m12.293 .707a3 3 0 1 1 0 6a3 3 0 0 1 0 -6" /></svg>
          </button>
  
      
          <div className="w-250 h-100 m-10 rounded-xl overflow-hidden shadow-2xl border border-white/20">
            <img 
              className="object-cover w-full h-full transition-opacity duration-500" 
              src={imgArr[currentIndex]} 
              alt="carousel" 
            />
          </div>
  
          <button className="z-20 bg-gray-700/50 p-5 rounded-full cursor-pointer hover:bg-gray-800 transition-all shadow-lg" onClick={nextSlide}>
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="fill-white"><path d="M18.707 8.293l3 3q .054 .053 .097 .112l.071 .11l.054 .114l.035 .105l.03 .148l.006 .118l-.003 .075l-.017 .126l-.03 .111l-.044 .111l-.052 .098l-.074 .104l-.073 .082l-3 3a1 1 0 0 1 -1.414 -1.414l1.292 -1.293h-7.585a1 1 0 0 1 0 -2h7.585l-1.292 -1.293a1 1 0 0 1 -.083 -1.32l.083 -.094a1 1 0 0 1 1.414 0m-13.707 .707a3 3 0 1 1 0 6a3 3 0 0 1 0 -6" /></svg>
          </button>
        </div>
  
   
        <div className="relative z-10 flex items-center justify-center gap-3 py-5">
          {imgArr.map((_, index) => (
            <div 
              key={index}
              className={`cursor-pointer transition-all duration-300 rounded-full ${
                currentIndex === index ? "bg-gray-800 w-5 h-2" : "bg-gray-400 w-2 h-2"
              }`}
              onClick={() => currentSlide(index)}
            />
          ))}
        </div>
      </div>
    );
  }

export default ImageCarousel;