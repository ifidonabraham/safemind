# CONSENT_DRAFT.md

**Status: pending legal and clinical review. Do not show this to real students.**

Version string to store on accept: `consent-draft-0.1`.

Short screen copy (plain language, second person):

---

Before you continue, here is what SafeMind does with what you share.

**What we collect.** A username and password. An email only if you choose to add one. Mood check-ins, journal entries, and chats you write. We do not ask for your real name.

**What the AI is.** An AI companion, not a counsellor and not an emergency service. It does not diagnose. It does not replace the counselling centre.

**Who can see what.** You can read your journal and chats. Peer supporters only see sessions assigned to them. A trained counsellor may review the relevant part of a conversation if the system flags possible serious risk. You are told before that happens. University admins see anonymous totals only. Groups smaller than 5 are hidden.

**What we do not do.** We do not sell your data. We do not show ads. We do not contact anyone outside SafeMind unless a later, approved policy says so.

**Your choices.** You can export your data or delete your account. Deleting removes your entries. You can decline this notice and leave.

This notice is a draft and has not been signed off under the Nigeria Data Protection Act.

---

Store `consent_version` and `consented_at` on accept. Decline logs the user out. Bump the version string when legal changes the text, and re-prompt anyone on an older version.
