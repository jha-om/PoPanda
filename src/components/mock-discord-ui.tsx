import { PropsWithChildren } from "react";
import { Icons } from "./icons";
import { Cog, Gift, Headphones, HelpCircle, Inbox, Menu, Mic, Phone, Pin, Plus, PlusCircle, Search, Smile, Sticker, User, UserCircle, Video } from "lucide-react";
import Image from "next/image";

export const MockDiscordUI = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex min-h-[800px] w-full max-w-[1200px] bg-discord-background text-white rounded-lg overflow-hidden shadow-xl">
            {/* server list */}
            <div className="hidden sm:flex w-[60px] md:w-[72px] bg-[#202225] py-3 flex-col items-center">
                <div className="size-10 md:size-12 bg-discord-brand-color rounded-2xl flex items-center justify-center mb-2 hover:rounded-xl transition-all duration-200">
                    <Icons.discord className="size-3/5 transform hover:scale-110 transition duration-300" />
                </div>

                {/* the white-gray bottom for separatness*/}
                <div className="w-6 md:w-8 h-[2px] bg-discord-background rounded-full my-2" />

                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="size-10 md:size-12 bg-discord-background rounded-3xl flex items-center justify-center mb-3 hover:rounded-xl transition-all duration-200 hover:bg-discord-brand-color cursor-not-allowed"
                    >
                        <span className="text-sm md:text-lg font-semibold text-gray-400">
                            {String.fromCharCode(65 + i)}
                        </span>
                    </div>
                ))}
                {/* the white-gray bottom for separatness*/}
                <div className="w-6 md:w-8 h-[2px] bg-discord-background rounded-full my-2" />

                <div
                    className="group mt-auto size-10 md:size-12 bg-discord-background rounded-3xl flex items-center cursor-pointer justify-center mb-3 hover:rounded-xl transition-all duration-200"
                >
                    <span className="text-sm md:text-lg font-semibold text-gray-400">
                        <Plus size="20" className="md:size-6 stroke-green-700 dark:stroke-green-500 transform group-hover:scale-125 transition duration-300" />
                    </span>
                </div>
            </div>

            {/* dm list - only show on larger screens */}
            <div className="hidden lg:flex w-60 bg-[#2f3136] flex-col">
                <div className="px-4 h-16 border-b border-[#202225] flex items-center shadow-sm">
                    <div className="w-full bg-[#202225] text-sm rounded px-2 h-8 flex items-center justify-center text-gray-500 cursor-text">
                        Find or start a conversation
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto pt-4">
                    <div className="px-2 mb-4">
                        <div className="flex items-center text-sm px-2 py-1.5 rounded hover:bg-[#393c43] text-[#dcddde] cursor-not-allowed">
                            <UserCircle className="mr-4 size-8 text-[#b9bbbe]" />
                            <span className="font-medium text-sm">Friends</span>
                        </div>
                        <div className="flex items-center text-sm px-2 py-1.5 rounded hover:bg-[#393c43] text-[#dcddde] cursor-not-allowed">
                            <Inbox className="mr-4 size-8 text-[#b9bbbe]" />
                            <span className="font-medium text-sm">Nitro</span>
                        </div>
                    </div>
                    <div className="px-2 mb-4">
                        <h3 className="text-xs font-semibold text-[#8e9297] px-2 mb-2 uppercase">
                            Direct Messages
                        </h3>

                        <div className="flex items-center px-2 py-1.5 rounded bg-[#393c43] text-white cursor-pointer">
                            <Image
                                src="/brand-asset-profile-picture.png"
                                alt="PoPanda Avatar"
                                width={32}
                                height={32}
                                className="object-cover rounded-full mr-3"
                            />
                            <span className="font-medium">PoPanda</span>
                        </div>

                        <div className="my-1 space-y-px">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex items-center px-2 py-1.5 rounded text-gray-600 cursor-not-allowed">
                                    <div className="size-8 rounded-full bg-discord-background mr-3" />
                                    <span className="font-medium">User {i + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-2 bg-[#292b2f] flex items-center">
                    <div className="size-8 rounded-full bg-brand-700 mr-2" />

                    <div className="flex-1">
                        <p className="text-sm font-medium text-white">You</p>
                        <p className="text-xs text-[#b9bbbe] flex items-center">
                            @your_account
                        </p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Mic className="size-5 text-[#b9bbbe] hover:text-white curson-pointer" />
                        <Headphones className="size-5 text-[#b9bbbe] hover:text-white curson-pointer" />
                        <Cog className="size-5 text-[#b9bbbe] hover:text-white curson-pointer" />
                    </div>
                </div>
            </div>

            {/* main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* dm header */}
                <div className="h-16 bg-[#36393f] flex items-center px-2 sm:px-4 shadow-sm border-b boder-[#202225]">
                    <div className="lg:hidden mr-2 sm:mr-4">
                        <Menu className="size-5 sm:size-6 text-[#b9bbbe] hover:text-white cursor-pointer" />
                    </div>

                    <div className="flex items-center min-w-0">
                        <div className="relative">
                            <Image
                                src="/brand-asset-profile-picture.png"
                                alt="PoPanda Avatar"
                                width={32}
                                height={32}
                                className="sm:w-10 sm:h-10 object-cover rounded-full mr-2 sm:mr-3"
                            />
                            <div className="absolute bottom-0 right-2 sm:right-3 size-2 sm:size-3 bg-green-500 rounded-full border-2 border-[#36393f]" />
                        </div>

                        <p className="font-semibold text-white text-sm sm:text-base truncate">PoPanda</p>
                    </div>

                    <div className="ml-auto flex items-center space-x-2 sm:space-x-4 text-[#b9bbbe]">
                        <Phone className="size-4 sm:size-5 hover:text-white cursor-not-allowed hidden md:block" />
                        <Video className="size-4 sm:size-5 hover:text-white cursor-not-allowed hidden md:block" />
                        <Pin className="size-4 sm:size-5 hover:text-white cursor-not-allowed hidden md:block" />
                        <User className="size-4 sm:size-5 hover:text-white cursor-not-allowed hidden md:block" />
                        <Search className="size-4 sm:size-5 hover:text-white cursor-not-allowed" />
                        <Inbox className="size-4 sm:size-5 hover:text-white cursor-not-allowed hidden sm:block" />
                        <HelpCircle className="size-4 sm:size-5 hover:text-white cursor-not-allowed hidden sm:block" />
                    </div>
                </div>

                {/* message history */}
                <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-discord-background flex flex-col-reverse min-h-0">
                    {children}
                </div>

                {/* message input */}
                <div className="p-2 sm:p-4">
                    <div className="flex items-center bg-[#40444b] rounded-lg p-1">
                        <PlusCircle className="mx-2 sm:mx-3 text-[#b9bbbe] hover:text-white cursor-not-allowed size-4 sm:size-5" />
                        <input
                            readOnly
                            type="text"
                            placeholder="Message @PoPanda"
                            className="flex-1 bg-transparent py-2 sm:py-2.5 px-1 text-sm sm:text-base text-white placeholder-[#72767d] focus:outline-none cursor-text"
                        />
                        <div className="flex items-center space-x-2 sm:space-x-3 mx-2 sm:mx-3 text-[#b9bbbe]">
                            <Gift className="size-4 sm:size-5 hover:text-white cursor-not-allowed hidden sm:block" />
                            <Sticker className="size-4 sm:size-5 hover:text-white cursor-not-allowed hidden sm:block" />
                            <Smile className="size-4 sm:size-5 hover:text-white cursor-not-allowed" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}