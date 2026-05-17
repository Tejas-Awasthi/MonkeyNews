'use client'

import React, { useState, Component } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import "./Navbar.css"


const navLinks = [
  { name: 'Business', category: 'business', href: '#', icon: ChartPieIcon },
  { name: 'Entertainment', category: 'entertainment', href: '#', icon: CursorArrowRaysIcon },
  { name: 'General', category: 'general', href: '#', icon: FingerPrintIcon },
  { name: 'Health', category: 'health', href: '#', icon: SquaresPlusIcon },
  { name: 'Science', category: 'science', href: '#', icon: ArrowPathIcon },
  { name: 'Sports', category: 'sports', href: '#', icon: ArrowPathIcon },
  { name: 'Technology', category: 'technology', href: '#', icon: ArrowPathIcon },
]

export class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileMenuOpen: false,
      scrolled: window.scrollY > 5,
      fetchNews: this.props.fetchNews
    }
  }
  onCategoryClick = (category) => {
    this.state.fetchNews(undefined, 10, 1, category)
  }
  render() {
    const { mobileMenuOpen, scrolled } = this.state

    document.body.onscroll = () => {
      (window.scrollY > 5) ? this.setState({ scrolled: true }) : this.setState({ scrolled: false })
    }
    const { category } = this.props
    return (
      <header className={`fixed inset-x-0 top-0 z-50 transition-all ease-in-out duration-250 ${scrolled ? "scrolled" : ""}`}>

        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => this.setState({ mobileMenuOpen: true })}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
              {({ close }) => (
                <>
                  <PopoverButton className="cursor-pointer flex items-center gap-x-1 text-sm/6 font-semibold text-white">
                    Categories
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-500" />
                  </PopoverButton>

                  <PopoverPanel
                    transition
                    className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                  >
                    <div className="p-4">
                      {navLinks.map((item) => (
                        <div
                          key={item.name}
                          className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-white/5"
                        >
                          <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-700/50 group-hover:bg-gray-700">
                            <item.icon aria-hidden="true" className="size-6 text-gray-400 group-hover:text-white" />
                          </div>
                          <div className="flex-auto">
                            <button onClick={() => { this.onCategoryClick(item.category); close() }} className="cursor-pointer block font-semibold text-white">
                              {item.name}
                              <span className="absolute inset-0" />
                            </button>
                            <p className="mt-1 text-gray-400">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </PopoverPanel>
                </>
              )}
            </Popover>

            <a href="#" className="text-sm/6 font-semibold text-white">
              Features
            </a>
            <a href="#" className="text-sm/6 font-semibold text-white">
              Marketplace
            </a>
            <a href="#" className="text-sm/6 font-semibold text-white">
              Company
            </a>
          </PopoverGroup>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm/6 font-semibold text-white">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={() => this.setState({ mobileMenuOpen: false })} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => this.setState({ mobileMenuOpen: false })}
                className="-m-2.5 rounded-md p-2.5 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    {({ close }) => (
                      <>
                        <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-white hover:bg-white/5">
                          Product
                          <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                        </DisclosureButton>
                        <DisclosurePanel className="mt-2 space-y-2">
                          {[...navLinks].map((item) => (
                            <button
                              key={item.name}
                              onClick={() => { this.onCategoryClick(item.category); close(); this.setState({ mobileMenuOpen: false }) }}
                              className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-white hover:bg-white/5"
                            // onClick={}
                            >
                              {item.name}
                            </button>
                          ))}
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                  >
                    Marketplace
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                  >
                    Company
                  </a>
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    )
  }
}

export default Navbar
