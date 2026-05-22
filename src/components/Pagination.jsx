import React, { Component } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export class Pagination extends Component {

    render() {
        const { totalResults, pageSize, currentPage } = this.props
        const totalPages = Math.ceil(totalResults / pageSize)

        return (
            <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        onClick={this.props.prevFunc}
                        className="relative disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer inline-flex items-center rounded-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0"
                        disabled={currentPage === 1 || this.props.reset}
                    >
                        Previous
                    </button>
                    <button
                        onClick={this.props.nextFunc}
                        className="relative disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer inline-flex items-center rounded-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0"
                        disabled={currentPage >= totalPages || this.props.reset}
                    >
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-300">
                            Showing{" "}
                            <span className="font-medium">
                                {!this.props.reset &&  (totalResults > 0) ? (currentPage - 1) * pageSize + 1 : 0}
                            </span>{" "}
                            to{" "}
                            <span className="font-medium">
                                {!this.props.reset ? Math.min(currentPage * pageSize, totalResults) : 0}
                            </span>
                            <span className="font-medium"> of {!this.props.reset ? totalResults : 0}</span> results
                        </p>
                    </div>
                    <div>
                        <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md">
                            <button
                                onClick={this.props.prevFunc}
                                className="relative disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0"
                                disabled={currentPage === 1 || this.props.reset}
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon aria-hidden="true" className="size-5" />
                            </button>
                            {/* Current: "z-10 text-white focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-500 focus-visible:outline-indigo-500", Default: "inset-ring focus:outline-offset-0 text-gray-200 inset-ring-gray-700 hover:bg-white/5" */}



                            <button
                                onClick={this.props.nextFunc}
                                className="relative disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0"
                                disabled={currentPage >= totalPages || this.props.reset}
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon aria-hidden="true" className="size-5" />
                            </button>



                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}

export default Pagination
