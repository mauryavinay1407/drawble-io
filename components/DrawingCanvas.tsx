'use client';
import React from 'react';
import { FaPencilAlt, FaEraser } from 'react-icons/fa';
import { IoArrowBack } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { useCanvas } from '@/context/CanvasContext';
import {useRouter} from "next/navigation";

const DrawingCanvas: React.FC = () => {
    const {
        canvasRef,
        lineColor,
        lineWidth,
        eraserWidth,
        isErasing,
        startDrawing,
        draw,
        finishDrawing,
        toggleEraser,
        activateDraw,
        setLineColor,
        setLineWidth,
        setEraserWidth,
    } = useCanvas();

    const resetCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            context?.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    const router=useRouter();
    return (
        <div className="w-full flex flex-col items-center p-4">
             <button className='fixed top-4 left-4 bg-gray-800 text-white p-2 rounded-full'
             onClick={()=>router.push('/')}
             >
                <IoArrowBack size={24} />
            </button>
            <div className="mb-4">
                <input
                    type="color"
                    value={lineColor}
                    onChange={(e) => setLineColor(e.target.value)}
                    className="h-10 w-10 border-2 rounded-full p-2 mr-4 cursor-pointer bg-slate-800"
                />
                <input
                    type="range"
                    min="1"
                    max="20"
                    value={lineWidth}
                    onChange={(e) => setLineWidth(Number(e.target.value))}
                    className="mr-2 cursor-pointer"
                />
                <span>{lineWidth}px</span>
            </div>

            <div className={`flex mb-4 items-center justify-center w-1/4 shadow-lg shadow-cyan-500/50  rounded-full bg-gray-800 transition-all duration-500 hover:h-20 hover:w-1/3 hover:p-4 hover:cursor-pointer hover:bg-gray-950
                 ${isErasing ? 'h-20 w-1/3 p-4' : 'h-20 p-2'}`}>
                <div className="flex space-x-4 border-white">
                    <button
                        onClick={activateDraw}
                        className={`rounded-full p-2 h-11 w-11 flex items-center justify-center transition duration-300 hover:-translate-y-1.5 ${!isErasing ? 'bg-black hover:bg-gray-600' : 'bg-red-500'}`}
                    >
                        <FaPencilAlt size={20} />
                    </button>
                    <button
                        onClick={toggleEraser}
                        className={`rounded-full p-2 h-11 w-11 flex items-center justify-center transition duration-300 hover:-translate-y-1.5 ${isErasing ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500'}`}
                    >
                        <FaEraser size={20} />
                    </button>
                </div>


                {isErasing && (
                    <>
                        <input
                            type="range"
                            min="5"
                            max="50"
                            value={eraserWidth}
                            onChange={(e) => setEraserWidth(Number(e.target.value))}
                            className="mr-2 ml-2 cursor-pointer"
                        />
                        <span>{eraserWidth}px</span>
                    </>
                )}


                <button
                    onClick={resetCanvas}
                    className="bg-slate-400 hover:bg-red-700 text-white font-bold ml-4 transition duration-300 hover:-translate-y-1.5 rounded-full h-10 w-10 flex items-center justify-center"
                >
                    <GrPowerReset size={20}/>
                </button>
            </div>


            <canvas
                ref={canvasRef}
                width={1500}
                height={800}
                className=""
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={finishDrawing}
                onMouseLeave={finishDrawing}
            />
        </div>
    );
};

export default DrawingCanvas;

