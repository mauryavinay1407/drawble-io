 'use client'
import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

interface CanvasContextType {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    isDrawing: boolean;
    lineColor: string;
    lineWidth: number;
    eraserWidth: number;
    isErasing: boolean;
    startDrawing: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    draw: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    finishDrawing: () => void;
    toggleEraser: () => void;
    activateDraw: () => void; // Added
    setLineColor: (color: string) => void;
    setLineWidth: (width: number) => void;
    setEraserWidth: (width: number) => void;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineColor, setLineColor] = useState('#ffffff');
    const [lineWidth, setLineWidth] = useState(5);
    const [eraserWidth, setEraserWidth] = useState(10);
    const [isErasing, setIsErasing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.style.cursor = isErasing ? 'crosshair' : 'pointer';
        }
    }, [isErasing]);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        ctx?.beginPath();
        ctx?.moveTo(getMousePos(canvas, e).x, getMousePos(canvas, e).y);
        setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        ctx?.lineTo(getMousePos(canvas, e).x, getMousePos(canvas, e).y);
        ctx!.lineWidth = isErasing ? eraserWidth : lineWidth;
        ctx!.strokeStyle = isErasing ? '#000000' : lineColor;
        ctx?.stroke();
    };

    const finishDrawing = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        ctx?.closePath();
        setIsDrawing(false);
    };

    const toggleEraser = () => {
        setIsErasing(true);
    };

    const activateDraw = () => {
        setIsErasing(false);
    };

    const getMousePos = (canvas: HTMLCanvasElement | null, e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvas!.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    return (
        <CanvasContext.Provider
            value={{
                canvasRef,
                isDrawing,
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
            }}
        >
            {children}
        </CanvasContext.Provider>
    );
};

export const useCanvas = () => {
    const context = useContext(CanvasContext);
    if (context === undefined) {
        throw new Error('useCanvas must be used within a CanvasProvider');
    }
    return context;
};

