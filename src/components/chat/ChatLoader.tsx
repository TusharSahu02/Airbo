import React from 'react'

const ChatLoader = () => {
    return (
        <div className="flex items-center w-max justify-start p-4 border rounded-b-2xl rounded-tr-2xl">
            <div className="animate-pulse flex space-x-2">
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
            </div>
        </div>
    )
}

export default ChatLoader
