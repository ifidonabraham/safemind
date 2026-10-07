import type { Metadata } from "next";

import { Banner } from "@/components/ui/status";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Who can see what on SafeMind, what the AI does, and when a person steps in.",
};

const access = [
  {
    who: "You",
    can: "Your check-ins, journal, chats, and support requests",
    cannot: "Anyone else's",
  },
  {
    who: "Peer supporter",
    can: "Messages in a session assigned to them",
    cannot: "Your journal, your AI chats, or other sessions",
  },
  {
    who: "Counsellor",
    can: "The part of a chat that was flagged, after you are told",
    cannot: "Your journal, or chats that were not flagged",
  },
  {
    who: "Admin",
    can: "Anonymous totals, only for groups of 5 or more",
    cannot: "Journals, messages, check-in notes, or chats",
  },
];

export default function HowItWorksPage() {
  return (
    <article className="mx-auto w-full min-w-0 max-w-[1120px] px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-primary">Safety and privacy</p>
      <h1 className="mt-3 max-w-[16ch] text-[36px] text-ink sm:text-[48px]">
        How SafeMind keeps you safe
      </h1>
      <p className="mt-4 max-w-[65ch] text-lg text-ink">
        Before the features, here is who can see what. Plain language, no small
        print.
      </p>

      <section className="mt-12 max-w-[65ch]">
        <h2 className="text-[28px] text-ink">What the AI does</h2>
        <p className="mt-3 text-base text-ink">
          I&apos;m an AI companion, not a counsellor. I can listen, and help you
          reach people who can help.
        </p>
        <p className="mt-3 text-base text-ink">
          The AI does not replace the counselling centre or emergency services.
          It does not contact anyone outside SafeMind.
        </p>
      </section>

      <section className="mt-12 max-w-[65ch]">
        <h2 className="text-[28px] text-ink">What people do</h2>
        <p className="mt-3 text-base text-ink">
          You can ask to talk with a peer supporter. They only see the session
          assigned to them.
        </p>
        <p className="mt-3 text-base text-ink">
          If a message suggests you may need urgent help, a trained counsellor
          may look at that part of the conversation. You see a notice first. A
          person decides what to do. The system does not call anyone for you.
        </p>
      </section>

      <div className="mt-8 max-w-[65ch]">
        <Banner tone="care" title="What you would see in a chat">
          A trained counsellor may look at this part of our conversation to help
          keep you safe. You can read how this works anytime.
        </Banner>
      </div>

      <section className="mt-12">
        <h2 className="text-[28px] text-ink">Who can see what</h2>
        <ul className="mt-4 flex flex-col gap-3 sm:hidden">
          {access.map((row) => (
            <li
              key={row.who}
              className="rounded-[20px] border border-line bg-surface p-4"
            >
              <h3 className="text-[22px] text-ink">{row.who}</h3>
              <p className="mt-2 text-base text-ink">
                <span className="font-medium">Can see. </span>
                {row.can}
              </p>
              <p className="mt-2 text-base text-ink-soft">
                <span className="font-medium text-ink">Cannot see. </span>
                {row.cannot}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-4 hidden overflow-x-auto rounded-[20px] border border-line sm:block">
          <table className="w-full border-collapse text-left text-base">
            <caption className="sr-only">Who can see what on SafeMind</caption>
            <thead className="bg-surface-alt text-ink">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">
                  Who
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Can see
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Cannot see
                </th>
              </tr>
            </thead>
            <tbody>
              {access.map((row) => (
                <tr key={row.who} className="border-t border-line bg-surface">
                  <th scope="row" className="px-4 py-4 align-top font-medium">
                    {row.who}
                  </th>
                  <td className="px-4 py-4 align-top text-ink">{row.can}</td>
                  <td className="px-4 py-4 align-top text-ink-soft">
                    {row.cannot}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-[65ch] text-sm text-ink-soft">
          Groups smaller than 5 are hidden, so a total cannot point to one
          person.
        </p>
      </section>

      <section className="mt-12 max-w-[65ch]">
        <h2 className="text-[28px] text-ink">What we do not do</h2>
        <p className="mt-3 text-base text-ink">
          We do not sell your data. We do not show ads. We do not send your
          journal or chats to third-party analytics.
        </p>
      </section>

      <section className="mt-12 max-w-[65ch]">
        <h2 className="text-[28px] text-ink">About this prototype</h2>
        <p className="mt-3 text-base text-ink">
          This is a stakeholder demo, not a service for real students yet. The
          privacy notice is pending legal and clinical review. Crisis contacts
          are not shown. They will be added only after the UNILAG counselling
          unit verifies them.
        </p>
      </section>
    </article>
  );
}
