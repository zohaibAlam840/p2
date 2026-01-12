"use client";

import React from "react";
import ConsoleShell from "../_components/ConsoleShell";
import { Card, Input, PrimaryButton, Select } from "../_components/ui";

export default function Page() {
  const [settings, setSettings] = React.useState({
    LIBRARYName: "App",
    timezone: "Asia/Karachi",
    emailReminders: "Enabled",
    defaultLoanDays: "14",
  });

  function set<K extends keyof typeof settings>(k: K, v: (typeof settings)[K]) {
    setSettings((p) => ({ ...p, [k]: v }));
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    alert(`Saved (mock): ${JSON.stringify(settings, null, 2)}`);
  }

  return (
    <ConsoleShell title="Settings" subtitle="System configuration (mock)." rightActions={null}>
      <Card title="General">
        <form onSubmit={save} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="LSIT LIBRARY Name" value={settings.LIBRARYName} onChange={(e) => set("LIBRARYName", e.target.value)} />
            <Input label="Timezone" value={settings.timezone} onChange={(e) => set("timezone", e.target.value)} />
            <Select label="Email reminders" value={settings.emailReminders} onChange={(e) => set("emailReminders", e.target.value)}>
              <option>Enabled</option>
              <option>Disabled</option>
            </Select>
            <Input label="Default loan days" value={settings.defaultLoanDays} onChange={(e) => set("defaultLoanDays", e.target.value)} />
          </div>

          <PrimaryButton type="submit">Save Settings</PrimaryButton>
        </form>
      </Card>
    </ConsoleShell>
  );
}
