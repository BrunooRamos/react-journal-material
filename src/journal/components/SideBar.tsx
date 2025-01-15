import React from 'react';
import { useAppSelector } from '../../hooks/useReduxConfig';

export const SideBar = () => {

    const { displayName, photoURL } = useAppSelector( state => state.auth as { displayName: string | null, photoURL: string | null } );

    return (
        <nav className="w-60 min-h-screen bg-white border-r border-gray-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {
                    photoURL 
                    ? <img src={photoURL} alt="User photo" className="w-full h-full object-cover" />
                    : <span className="text-xl text-gray-600">
                        {displayName?.charAt(0)}
                      </span>
                }
            </div>
            <h2 className="text-xl font-semibold truncate">
                {displayName}
            </h2>
        </div>

        {/* Lista de meses */}
        <ul className="py-2">
            {['Enero', 'Febrero', 'Marzo', 'Abril'].map(text => (
            <li key={text} className="px-3">
                <button className="w-full flex items-start p-3 hover:bg-gray-100 rounded-lg group">
                {/* Icono */}
                <svg className="w-5 h-5 text-gray-500 mr-3 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>

                {/* Texto */}
                <div className="flex flex-col">
                    <span className="font-medium">{text}</span>
                    <span className="text-sm text-gray-500">
                    Exercitation cillum irure elit consectetur.
                    </span>
                </div>
                </button>
            </li>
            ))}
        </ul>
        </nav>
    );
}
