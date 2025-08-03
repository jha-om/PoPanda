import { Heading } from "../../components/heading";
import { MaxWidthWrapper } from "../../components/max-width-wrapper";
import { Check, Star } from "lucide-react"
import { ShinyButton } from "../../components/shinny-button";
import { MockDiscordUI } from "@/components/mock-discord-ui";
import { AnimatedList } from "@/components/magicui/animated-list";
import { DiscordMessage } from "@/components/discord-message";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Icons } from "@/components/icons";

const Page = () => {
  const codeSnippet = `await fetch("http://localhost:3000/api/v1/events", {
  method: "POST",
  body: JSON.stringify({
    category: "sale",
    fields: {
      plan: "PRO",
      email: "makri_man@peter.parker",
      amount: 39.00
    }
  }),
  headers: {
    Authorization: "Bearer <YOUR_API_KEY>"
  }
})`;

  return (
    <>
      {/* hero section */}
      <section className="relative py-24 sm:py-32">
        <MaxWidthWrapper className="text-center">
          <div className="relative mx-auto text-center flex flex-col items-center gap-10">
            <div>
              <Heading>
                <span>real-time saas insights</span>
                <br />
                <span className="relative bg-gradient-to-r from-brand-700 to-brand-800 text-transparent bg-clip-text">Delivered to Your Discord</span>
              </Heading>
            </div>
            <p className="text-base/7 text-gray-600 max-w-prose text-pretty">P<span className="text-sm underline">o</span>Panda is the easiest way to monitor your SaaS, Get instant notifications for <span className="font-semibold text-gray-700">sales, new users, or any other event </span>
              sent directly to your Discord.
            </p>

            <ul className="space-y-2 text-base text-gray-700 text-left flex flex-col sm:items-start">
              {[
                "Real-time Discord alerts for critical events",
                "Buy once, use forever",
                "Track sales, new users, or any other event",
              ].map((item, index) => (
                <li key={index} className="flex gap-1.5 items-center text-left">
                  <Check className="size-5 shrink-0 text-brand-700" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="w-full max-w-80">
              <ShinyButton href="/sign-up" className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">Start Today For Free!</ShinyButton>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* discord ui section */}
      <section className="relative pb-4">
        <div className="absolute inset-x-0 bottom-24 top-24 bg-brand-700" />
        <div className="relative mx-auto">
          <MaxWidthWrapper className="relative">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <MockDiscordUI>
                <AnimatedList>
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="PoPanda"
                    username="PoPanda"
                    timestamp="today at 3:45 AM"
                    badgeText="Signup"
                    badgeColor="#43b581"
                    title="👤 New user signed up"
                    content={{
                      name: "Jarvis",
                      email: "jarvis@tony.stark"
                    }}
                  />
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="PoPanda"
                    username="PoPanda"
                    timestamp="today at 3:45 AM"
                    badgeText="Purchase"
                    badgeColor="#faa61a"
                    title="💸 Payment received"
                    content={{
                      amount: "$69.00",
                      name: "makri man",
                      email: "spider@peter.parker",
                      plan: "PRO",
                    }}
                  />
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="PoPanda"
                    username="PoPanda"
                    timestamp="today at 5:25 AM"
                    badgeText="MileStone"
                    badgeColor="#5865f2"
                    title="🚀 Revenue Milestone Acheived"
                    content={{
                      recurringRevenue: "$10.000",
                      growth: "+60%",
                    }}
                  />
                </AnimatedList>
              </MockDiscordUI>
            </div>
          </MaxWidthWrapper>
        </div>
      </section>

      {/* bento grid section -- features */}
      <section className="relative py-24 sm:py-32">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
          <div>
            <h2 className="text-center text-base/7 font-semibold text-brand-600">
              Intuitive Monitoring
            </h2>
            <Heading className="text-center">Stay ahead with real-time insights</Heading>
          </div>

          <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
            {/* first bento grid element */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                    Real-time notifications
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Get notified about critical events the moment they happen, no matter if you&apos;re at home or somewhere else.
                  </p>
                </div>

                {/* important class here -> knew what it does?? */}
                <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                  {/* but what is cqw? -> container query width, that grows or shrinks according to the parent property(on which they are applied to); */}
                  {/* creates the phone screen mockup */}
                  <div className="absolute sm:w-full inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                    <Image
                      className="size-full object-cover object-top"
                      src="/phone-screen.png"
                      alt="Phone screen displaying app interface"
                      fill
                    />

                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
            </div>

            {/* second bento grid element */}
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius) + 1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                    Track any Event
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    From new user signups to successful payment done,
                    PoPanda notifies directly in your <span className="font-bold underline">Discord</span> Inbox about all the critical events in your SaaS.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                  <Image
                    className="w-full max-lg:max-w-xs"
                    src="/bento-any-event.png"
                    alt="Bento box illustrating event tracking"
                    width={500}
                    height={300}
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]" />
            </div>

            {/* third bento grid element */}
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                    Track any Properties
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Add any custom data you like to an event, such as a user email, a purchase amount or an exceeded quota.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                  <Image
                    className="w-full max-lg:max-w-xs"
                    src="/bento-custom-data.png"
                    alt="Bento box illustrating custom data tracking"
                    width={500}
                    height={300}
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
            </div>

            {/* fourth bento grid element */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                    Easy Integration
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Connect PoPanda with your existing workflows in minutes and call our intuitive logging API from any language.
                  </p>
                </div>

                <div className="relative min-h-[30rem] w-full grow">
                  <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                    <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                      <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                        <div className="flex items-center border-b border-r border-b-white/20 border-r-white/20 bg-white/5 px-4 py-2 text-white">
                          <Icons.javascript />
                          <span className="ml-1.5">popanda.js</span>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-hidden">
                      <div className="max-h-[30rem]">
                        <SyntaxHighlighter
                          language="typescript"
                          style={{
                            ...oneDark,
                            'pre[class*="language-"]': {
                              ...oneDark['pre[class*="language-"]'],
                              background: "transparent",
                              overflow: "hidden"
                            },
                            'code[class*="language-"]': {
                              ...oneDark['code[class*="language-"]'],
                              background: "transparent",
                            }
                          }}
                        >
                          {codeSnippet}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* customer review section */}
      <section className="relative py-24 sm:py-32">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
          <div>
            <h2 className="text-center text-base/7 font-semibold text-brand-600">
              Real-World Experiences
            </h2>
            <Heading className="text-center">What our customers say</Heading>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 divide-gray-200">
            {/* first customer review */}
            <div className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-t-[2rem] lg:rounded-tr-none lg:rounded-l-[2rem]">
              <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
              </div>

              <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-normal text-brand-950 text-center lg:text-left text-pretty">
                PoPanda is trully a game-changer for me, it really pushes all the events in real-time, super satisfying and easy to use.
              </p>

              <div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image
                  src="/user-2.png"
                  className="rounded-full object-cover"
                  width={48}
                  height={48}
                  alt="Random User"
                />
                <div className="flex flex-col items-center sm:items-start">
                  <p className="font-semibold flex items-center">
                    Girlie Gamora
                    <Icons.verificationBadge className="size-4 inline-block ml-1" />
                  </p>
                  <p className="text-sm text-gray-600">@moralie</p>
                </div>
              </div>
            </div>

            {/* second customer review */}
            <div className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-br-[2rem] sm:ml-2.5 max-sm:mt-3 max-sm:rounded-bl-[2rem] lg:rounded-r-[2rem]">
              <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
              </div>

              <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-normal text-brand-950 text-center lg:text-left text-pretty">
                Why the hell this thing is not created earlier by someone, a simple way to see how we&apos;re doing day-to-day, such a cool thing PoPanda is, absolutely loved the product.
              </p>

              <div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image
                  src="/user-1.png"
                  className="rounded-full object-cover"
                  width={48}
                  height={48}
                  alt="Random User"
                />
                <div className="flex flex-col items-center sm:items-start">
                  <p className="font-semibold flex items-center">
                    Sanskaari Stark
                    <Icons.verificationBadge className="size-4 inline-block ml-1" />
                  </p>
                  <p className="text-sm text-gray-600">@sataark</p>
                </div>
              </div>
            </div>
          </div>
          <ShinyButton href="/sign-up" className="relative z-10 h-14 w-full max-w-xs text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">
            Start For Free Today
          </ShinyButton>
        </MaxWidthWrapper>
      </section>
    </>
  )
}

export default Page;