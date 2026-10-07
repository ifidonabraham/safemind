"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Modal, Sheet } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Banner, EmptyState, ErrorState } from "@/components/ui/status";
import { Tabs } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";

export function FeedbackSection() {
  const { push } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-[28px]">Feedback</h2>
      <Banner tone="info" title="Info">
        A quiet notice. Nothing here needs a fast reaction.
      </Banner>
      <Banner tone="care" title="Care">
        A trained counsellor may look at this part of our conversation to help
        keep you safe. You can read how this works anytime.
      </Banner>
      <EmptyState
        title="No check-ins yet"
        description="No check-ins yet. How are you feeling right now?"
      />
      <ErrorState
        title="This did not load"
        description="You can try again in a moment."
        action={<Button variant="secondary">Try again</Button>}
      />
      <div aria-hidden="true" className="flex flex-col gap-3">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-24" />
      </div>
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() =>
            push({
              title: "Saved on this device",
              description: "This preview notice goes away on its own.",
            })
          }
        >
          Show notice
        </Button>
        <Button variant="secondary" onClick={() => setModalOpen(true)}>
          Open modal
        </Button>
        <Button variant="secondary" onClick={() => setSheetOpen(true)}>
          Open sheet
        </Button>
      </div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="A quiet dialog"
      >
        <p>Dialogs stay still and readable. Press Escape to close.</p>
      </Modal>
      <Sheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="A bottom sheet"
      >
        <p>Sheets are for short choices on a phone.</p>
      </Sheet>
      <Tabs
        label="Preview tabs"
        tabs={[
          {
            id: "one",
            label: "Listen",
            content: <p>The companion can listen.</p>,
          },
          {
            id: "two",
            label: "People",
            content: <p>A person steps in when you need one.</p>,
          },
        ]}
      />
    </section>
  );
}
