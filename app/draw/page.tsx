import React from 'react';
import DrawingCanvas from '@/components/DrawingCanvas';
import { CanvasProvider } from '@/context/CanvasContext';

const Home: React.FC = () => {
    return (
        <CanvasProvider>
            <div className="flex flex-col items-center justify-center min-h-screen bg-black">
                <DrawingCanvas />
            </div>
        </CanvasProvider>
    );
};

export default Home;