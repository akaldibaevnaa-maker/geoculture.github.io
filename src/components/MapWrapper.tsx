"use client";

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-deep-blue text-kaz-blue">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-kaz-blue border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-medium tracking-wider">Загрузка карты...</p>
      </div>
    </div>
  ),
});

export default function MapWrapper() {
  return <Map />;
}
