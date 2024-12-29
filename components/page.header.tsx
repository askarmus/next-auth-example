import Link from 'next/link'
import React from 'react'

type HeaderProps = {
    title: string
    breadcrumb: string
    buttonText: string
    buttonLink: string
}

const PageHeader: React.FC<HeaderProps> = ({
    title,
    breadcrumb,
    buttonText,
    buttonLink,
}) => {
    return (
        <div className="container mx-auto px-2">
            <div className="flex flex-wrap">
                <div className="flex items-center py-4 w-full">
                    <div className="w-full">
                        <div>
                            <div className="flex flex-wrap justify-between">
                                <div className="items-center">
                                    <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                                        {title}
                                    </h1>
                                    <ol className="list-reset flex text-sm">
                                        {breadcrumb
                                            .split(' / ')
                                            .map((crumb, index) => (
                                                <React.Fragment key={index}>
                                                    <li
                                                        className={
                                                            index ===
                                                            breadcrumb.split(
                                                                ' / '
                                                            ).length -
                                                                1
                                                                ? 'text-blue-600 hover:text-blue-700'
                                                                : 'text-gray-500'
                                                        }
                                                    >
                                                        {index ===
                                                        breadcrumb.split(' / ')
                                                            .length -
                                                            1 ? (
                                                            crumb
                                                        ) : (
                                                            <a
                                                                href="#"
                                                                className="text-gray-500"
                                                            >
                                                                {crumb}
                                                            </a>
                                                        )}
                                                    </li>
                                                    {index <
                                                        breadcrumb.split(' / ')
                                                            .length -
                                                            1 && (
                                                        <li>
                                                            <span className="text-gray-500 mx-2">
                                                                /
                                                            </span>
                                                        </li>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                    </ol>
                                </div>
                                <div className="flex items-center">
                                    <Link
                                        href={buttonLink}
                                        className="px-3 py-2 lg:px-4 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600"
                                    >
                                        {buttonText}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageHeader
