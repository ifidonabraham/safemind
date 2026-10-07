import { Avatar } from "@/components/ui/avatar";
import { Badge, RiskBadge, type RiskLevel } from "@/components/ui/badge";
import { BreathingOrb } from "@/components/ui/breathing-orb";
import { Card, ChartCard, StatCard } from "@/components/ui/card";
import { ChatBubble, TypingIndicator } from "@/components/ui/chat-bubble";
import { ProgressDots } from "@/components/ui/progress-dots";

const levels: RiskLevel[] = ["none", "low", "moderate", "high", "critical"];

export function ContentSection() {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-[28px]">Content</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <h3 className="text-[22px]">Card</h3>
          <p className="mt-2 text-ink-soft">
            Warm paper, soft border, no glare.
          </p>
        </Card>
        {/* PROTOTYPE: sample figure for the design preview only. */}
        <StatCard
          label="Sample total"
          value="24"
          hint="Sample figure for this preview. Not real student data."
        />
        <ChartCard
          title="Empty chart"
          description="Charts arrive with check-ins."
        />
      </div>
      <ChartCard title="Sample sparkline" description="Decorative only.">
        <svg viewBox="0 0 240 64" className="h-16 w-full" aria-hidden="true">
          <polyline
            fill="none"
            stroke="#2F6F6A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="0,48 40,40 80,44 120,28 160,32 200,16 240,20"
          />
        </svg>
      </ChartCard>
      <div className="flex flex-wrap items-center gap-3">
        <Badge>Alias only</Badge>
        {levels.map((level) => (
          <RiskBadge key={level} level={level} />
        ))}
        <Avatar alias="Adaeze" label="Adaeze" />
      </div>
      <ProgressDots
        label="Setup"
        steps={["Account", "Consent", "Check-in", "Journal"]}
        current={1}
      />
      <div className="flex max-w-xl flex-col gap-3">
        <ChatBubble from="you">
          Exams start next week and I can&apos;t sleep.
        </ChatBubble>
        <ChatBubble from="companion">
          I&apos;m an AI companion, not a counsellor. I can listen, and help you
          reach people who can help.
        </ChatBubble>
        <TypingIndicator />
      </div>
      <div className="h-48 max-w-md overflow-hidden rounded-[20px] border border-line bg-surface">
        <BreathingOrb className="h-full w-full" />
      </div>
    </section>
  );
}
