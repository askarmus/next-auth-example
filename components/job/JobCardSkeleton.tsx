export default function JobCardSkeleton() {
    return (
        <div className="p-6 bg-white rounded-lg shadow-sm border animate-pulse">
            <div className="flex items-start justify-between">
                {/* Title area */}
                <div className="w-3/4">
                    <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4"></div>
                    <div className="flex items-center gap-3 mb-2">
                        {/* Open tag */}
                        <div className="h-6 w-16 bg-yellow-100 rounded-md"></div>
                        {/* Posted date */}
                        <div className="h-6 w-48 bg-gray-200 rounded-md border border-gray-300"></div>
                    </div>
                    {/* Application count */}
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-24 bg-gray-200 rounded-md"></div>
                        <div className="h-5 w-4 bg-gray-200 rounded-md"></div>
                    </div>
                </div>
                {/* Menu dots */}
                <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
            </div>
        </div>
    )
}
